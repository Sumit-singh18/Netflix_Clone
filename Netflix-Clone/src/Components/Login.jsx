import { useState } from "react";
import Header from "./Header";
import { Formik, Form, Field, ErrorMessage } from "formik";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../Utils/Firebase";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser } from "../Utils/userSlice";

const Login = () => {
  const navigate = useNavigate();
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
        .then((userCredential) => {
          const user = userCredential.user;
          console.log("User created successfully", user);
          return updateProfile(user, {
            displayName: values.FullName,
            photoURL: "https://example.com/jane-q-user/profile.jpg",
          }).then(() => {
            console.log("Profile updated successfully");
            return user; // Ensure the user object is returned after updating the profile
          });
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
        <svg
          viewBox="0 0 111 30"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          aria-hidden="true"
          role="img"
          className="default-ltr-cache-1d568uk ev1dnif2 w-48 ml-48 p-2"
        >
          <g>
            <path
              fill="red"
              d="M105.06233,14.2806261 L110.999156,30 C109.249227,29.7497422 107.500234,29.4366857 105.718437,29.1554972 L102.374168,20.4686475 L98.9371075,28.4375293 C97.2499766,28.1563408 95.5928391,28.061674 93.9057081,27.8432843 L99.9372012,14.0931671 L94.4680851,-5.68434189e-14 L99.5313525,-5.68434189e-14 L102.593495,7.87421502 L105.874965,-5.68434189e-14 L110.999156,-5.68434189e-14 L105.06233,14.2806261 Z M90.4686475,-5.68434189e-14 L85.8749649,-5.68434189e-14 L85.8749649,27.2499766 C87.3746368,27.3437061 88.9371075,27.4055675 90.4686475,27.5930265 L90.4686475,-5.68434189e-14 Z M81.9055207,26.93692 C77.7186241,26.6557316 73.5307901,26.4064111 69.250164,26.3117443 L69.250164,-5.68434189e-14 L73.9366389,-5.68434189e-14 L73.9366389,21.8745899 C76.6248008,21.9373887 79.3120255,22.1557784 81.9055207,22.2804387 L81.9055207,26.93692 Z M64.2496954,10.6561065 L64.2496954,15.3435186 L57.8442216,15.3435186 L57.8442216,25.9996251 L53.2186709,25.9996251 L53.2186709,-5.68434189e-14 L66.3436123,-5.68434189e-14 L66.3436123,4.68741213 L57.8442216,4.68741213 L57.8442216,10.6561065 L64.2496954,10.6561065 Z M45.3435186,4.68741213 L45.3435186,26.2498828 C43.7810479,26.2498828 42.1876465,26.2498828 40.6561065,26.3117443 L40.6561065,4.68741213 L35.8121661,4.68741213 L35.8121661,-5.68434189e-14 L50.2183897,-5.68434189e-14 L50.2183897,4.68741213 L45.3435186,4.68741213 Z M30.749836,15.5928391 C28.687787,15.5928391 26.2498828,15.5928391 24.4999531,15.6875059 L24.4999531,22.6562939 C27.2499766,22.4678976 30,22.2495079 32.7809542,22.1557784 L32.7809542,26.6557316 L19.812541,27.6876933 L19.812541,-5.68434189e-14 L32.7809542,-5.68434189e-14 L32.7809542,4.68741213 L24.4999531,4.68741213 L24.4999531,10.9991564 C26.3126816,10.9991564 29.0936358,10.9054269 30.749836,10.9054269 L30.749836,15.5928391 Z M4.78114163,12.9684132 L4.78114163,29.3429562 C3.09401069,29.5313525 1.59340144,29.7497422 0,30 L0,-5.68434189e-14 L4.4690224,-5.68434189e-14 L10.562377,17.0315868 L10.562377,-5.68434189e-14 L15.2497891,-5.68434189e-14 L15.2497891,28.061674 C13.5935889,28.3437998 11.906458,28.4375293 10.1246602,28.6868498 L4.78114163,12.9684132 Z"
            ></path>
          </g>
        </svg>
      </div>{" "}
      <div className="absolute bg-gradient-to-b from-black">
        <img
          className="bg-gradient-to-b from-black"
          src="https://assets.nflxext.com/ffe/siteui/vlv3/655a9668-b002-4262-8afb-cf71e45d1956/5ff265b6-3037-44b2-b071-e81750b21783/IN-en-20240715-POP_SIGNUP_TWO_WEEKS-perspective_WEB_c6d6616f-4478-4ac2-bdac-f54b444771dd_large.jpg"
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
