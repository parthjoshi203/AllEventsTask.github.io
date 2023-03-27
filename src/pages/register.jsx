import React, { useContext } from "react";
import TextInput from "../components/textInput";
import FormikForm from "../components/formikForm";
import { AuthContext } from "../context/authContext";

const fields = [
  {
    component: TextInput,
    id: "name",
    name: "name",
    autoComplete: "name",
    placeholder: "Name",
    className: "rounded-t-md",
    validate: (value) => {
      if (!value) return "Required...";
      return "";
    },
  },
  {
    component: TextInput,
    id: "email",
    name: "email",
    type: "email",
    autoComplete: "email",
    placeholder: "Email address",
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
    validate: (value) => {
      if (!value) return "Required...";
      return "";
    },
  },
  {
    component: TextInput,
    id: "confirmPassword",
    name: "confirmPassword",
    type: "password",
    autoComplete: "new-password",
    placeholder: "Confirm Password",
    className: "rounded-b-md",
    validate: (value) => {
      if (!value) return "Required...";
      return "";
    },
  },
];

const Register = () => {
  const { register } = useContext(AuthContext);
  return (
    <>
      <h1 className="font-bold -mb-5 flex text-2xl justify-center text-center text-gray-800">
        REGISTER
      </h1>
      <FormikForm
        fields={fields}
        initialValues={{
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
        }}
        onSubmit={register}
        btnText="Sign up"
      />
    </>
  );
};

export default Register;
