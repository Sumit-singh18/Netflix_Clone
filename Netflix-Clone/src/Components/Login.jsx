import { useState } from "react";
import { BackgroundImage ,NetFlixLogo } from "../Constants/Constants";
import { Formik, Form, Field, ErrorMessage } from "formik";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../Utils/Firebase";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { addUser } from "../Utils/userSlice";

const Login = () => {
  const dispatch = useDispatch();
  const [signinForm, setSignInForm] = useState(true);

  const toggleSigninForm = (event) => {
    event.preventDefault(); // Prevent the default form submission
    setSignInForm(!signinForm);
  };

  const validationSchema = Yup.object().shape({
    emailOrPhone: Yup.string().required("Email or mobile number is required"),
    password: Yup.string().required("Password is required"),
    FullName: signinForm ? Yup.string() : Yup.string().required("Full Name is required"),
  });

  const handleSubmit = (values, { setSubmitting, setErrors }) => {
    setSubmitting(false);

    if (signinForm) {
      // Sign In Logic
      signInWithEmailAndPassword(auth, values.emailOrPhone, values.password)
        .then((userCredential) => {
          const user = userCredential.user;
          console.log("Sign-in successful", user);
          dispatch(
            addUser({
              uid: user.uid,
              displayName: user.displayName,
              email: user.email,
              photoURL: user.photoURL,
            })
          );
        })
        .catch((error) => {
          console.log("Error signing in:", error);
          const errorMessage = error.message;
          setErrors({ emailOrPhone: errorMessage });
          setErrors({ password: errorMessage });
        });
    } else {
      // Sign Up Logic
      createUserWithEmailAndPassword(auth, values.emailOrPhone, values.password)
        .then(async (userCredential) => {
          const user = userCredential.user;
          console.log("User created successfully", user);
          await updateProfile(user, {
            displayName: values.FullName,
            photoURL: "https://example.com/jane-q-user/profile.jpg",
          });
          console.log("Profile updated successfully");
          return user;
        })
        .then((user) => {
          console.log("Updated user:", user);
          dispatch(
            addUser({
              uid: user.uid,
              displayName: user.displayName,
              email: user.email,
              photoURL: user.photoURL,
            })
          );
        })
        .catch((error) => {
          console.log("Error signing up:", error);
          const errorMessage = error.message;
          setErrors({ emailOrPhone: errorMessage });
          setErrors({ password: errorMessage });
        });
    }
  };


  return (
    <div className=" ">
      <div className="absolute w-full py-2 px-8 bg-gradient-to-b from-black z-10">
        <NetFlixLogo/>
      </div>{" "}
      <div className="absolute bg-gradient-to-b from-black">
        <img
          className="bg-gradient-to-b from-black"
          src={BackgroundImage}
          alt="Background_image"
        />
      </div>
      <Formik
        initialValues={{ emailOrPhone: "", password: "" , FullName: ""}}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="flex flex-col w-3/12 absolute p-12 bg-black mx-auto left-0 right-0 my-40 bg-opacity-80 px-16">
            <span className="m-2 text-3xl text-white font-semibold">
              {signinForm ? "Sign In" : "Sign Up"}
            </span>
            {signinForm ? null : (
              <Field
                name="FullName"
                type="text"
                placeholder="Enter Full Name"
                className="m-2 mt-4 p-3 rounded-md bg-transparent border text-white border-slate-400"
              />
            )}
            <Field
              name="emailOrPhone"
              type="text"
              placeholder="Email or mobile number"
              className="m-2 mt-4 p-3 rounded-md bg-transparent border text-white border-slate-400"
            />
            <ErrorMessage
              name="emailOrPhone"
              component="div"
              className="text-red-500 text-sm m-2"
            />
            <Field
              name="password"
              type="password"
              placeholder="Password"
              className="m-2 p-3 rounded-md bg-transparent border text-white border-slate-400"
            />
            <ErrorMessage
              name="password"
              component="div"
              className="text-red-500 text-sm m-2"
            />
            <button
              type="submit"
              className="m-2 p-2 text-white bg-red-600 rounded-md"
              disabled={isSubmitting}
            >
              {signinForm ? "Sign in " : "Sign up"}
            </button>

            <span className="m-2 text-md text-slate-200 opacity-70">
              {signinForm ? (
                <span className="text-white">
                  New to Netflix?{" "}
                  <button
                    type="button"
                    onClick={toggleSigninForm}
                    className="m-2 hover:underline text-md text-white opacity-100 left-0 right-0 mx-auto"
                  >
                    Signup Now
                  </button>
                </span>
              ) : (
                <span className="text-white">
                  Already have an account?{" "}
                  <button
                    type="button"
                    onClick={toggleSigninForm}
                    className="m-2 hover:underline text-md text-white opacity-100 left-0 right-0 mx-auto"
                  >
                    Sign In
                  </button>
                </span>
              )}
            </span>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Login;
