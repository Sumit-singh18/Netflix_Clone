import { useState } from "react";
import Header from "./Header";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const Login = () => {
  const [signinForm, setSignInForm] = useState(true);

  const toggleSigninForm = (event) => {
    event.preventDefault(); // Prevent the default form submission
    setSignInForm(!signinForm);
  };

  const validationSchema = Yup.object().shape({
    emailOrPhone: Yup.string().required("Email or mobile number is required"),
    password: Yup.string().required("Password is required"),
  });

  const handleSubmit = (values, { setSubmitting }) => {
    console.log(values);
    setSubmitting(false);
  };

  return (
    <div className=" ">
      <Header />
      <div className="absolute bg-gradient-to-b from-black">
        <img
          className="bg-gradient-to-b from-black"
          src="https://assets.nflxext.com/ffe/siteui/vlv3/655a9668-b002-4262-8afb-cf71e45d1956/5ff265b6-3037-44b2-b071-e81750b21783/IN-en-20240715-POP_SIGNUP_TWO_WEEKS-perspective_WEB_c6d6616f-4478-4ac2-bdac-f54b444771dd_large.jpg"
          alt="Background_image"
        />
      </div>
      <Formik
        initialValues={{ emailOrPhone: "", password: "" }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="flex flex-col w-3/12 absolute p-12 bg-black mx-auto left-0 right-0 my-40 bg-opacity-80 px-16">
            <span className="m-2 text-3xl text-white font-semibold">
              {signinForm ? "Sign In" : "Sign Up"}
            </span>
            <Field
              name="emailOrPhone"
              type="text"
              placeholder="Email or mobile number"
              className="m-2 mt-4 p-3 rounded-md bg-transparent border text-white border-slate-400"
            />
            <ErrorMessage name="emailOrPhone" component="div" className="text-red-500 text-sm m-2" />
            <Field
              name="password"
              type="password"
              placeholder="Password"
              className="m-2 p-3 rounded-md bg-transparent border text-white border-slate-400"
            />
            <ErrorMessage name="password" component="div" className="text-red-500 text-sm m-2" />
            <button
              type="submit"
              className="m-2 p-2 text-white bg-red-600 rounded-md"
              disabled={isSubmitting}
            >
              {signinForm ? "Sign in" : "Sign up"}
            </button>
            <span className="m-2 text-md text-slate-200 opacity-70 mx-auto left-0 right-0">
              OR{" "}
            </span>
            <button
              type="button"
              className="m-2 p-2 text-white bg-slate-700 bg-opacity-80 rounded-md"
            >
              Use a sign in code
            </button>
            <span className="m-2 text-md text-slate-200 opacity-70">
              {signinForm ? (
                <>
                  New to Netflix?{" "}
                  <button
                    type="button"
                    onClick={toggleSigninForm}
                    className="m-2 hover:underline text-md text-white opacity-100 left-0 right-0 mx-auto"
                  >
                    Signup Now
                  </button>
                </>
              ) : (
                <>
                  Already have an account?{" "}
                  <button
                    type="button"
                    onClick={toggleSigninForm}
                    className="m-2 hover:underline text-md text-white opacity-100 left-0 right-0 mx-auto"
                  >
                    Sign In
                  </button>
                </>
              )}
            </span>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Login;
