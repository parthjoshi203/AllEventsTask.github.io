import React, { useContext } from "react";
import { Field } from "formik";
import TextInput from "../components/textInput";
import FormikForm from "../components/formikForm";
import { AuthContext } from "../context/authContext";

const fields = [
  {
    component: TextInput,
    id: "email-address",
    name: "email",
    type: "email",
    autoComplete: "email",
    placeholder: "Email address",
    className: "rounded-t-md",
    validate: (value) => {
      if (!value) return "Required...";
      if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value))
        return "Please Enter Valid Email";
      return "";
    },
  },
  {
    component: TextInput,
    id: "password",
    name: "password",
    type: "password",
    autoComplete: "new-password",
    placeholder: "Password",
    className: "rounded-b-md",
    validate: (value) => {
      if (!value) return "Required...";
      return "";
    },
  },
];
const Login = () => {
  const { login } = useContext(AuthContext);
  return (
    <>
      <h1 className="font-bold -mb-5 flex text-2xl justify-center text-center text-gray-800">
        LOGIN PAGE
      </h1>
      <FormikForm
        fields={fields.slice(0, 2)}
        initialValues={{
          email: "",
          password: "",
        }}
        onSubmit={login}
        btnText="Sign in"
      >
        <div className=" flex">
          <div className="text-sm  ">
            <a
              href="#"
              className="font-medium  text-indigo-600 hover:text-indigo-500"
            >
              Forgot your password?
            </a>
          </div>
        </div>
        <div className="gap-2 flex">
          <p>Don't have an account?</p>
          <a
            href="register"
            className="font-medium text-indigo-600 hover:text-indigo-500"
          >
            Sign up
          </a>
        </div>
      </FormikForm>
    </>
  );
};

export default Login;
