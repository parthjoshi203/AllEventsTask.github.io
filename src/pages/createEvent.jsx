import { Field } from "formik";
import React, { useContext } from "react";
import FormikForm from "../components/formikForm";
import Select from "../components/select";
import TextInput from "../components/textInput";
import { AuthContext } from "../context/authContext";
import { ProductContext } from "../context/productContext";

const fields = [
  {
    component: TextInput,
    id: "eventName",
    name: "eventName",
    type: "text",
    placeholder: "Event Name",
    className: "rounded-md",
    event: "event",
    validate: (value) => {
      if (!value) return "Required...";
      return "";
    },
  },
  {
    component: TextInput,
    id: "startDate",
    name: "startDate",
    type: "date",
    placeholder: "Starting Date",
    className: "rounded-md",
    event: "event",
    validate: (value) => {
      if (!value) return "Required...";
      return "";
    },
  },
  {
    component: TextInput,
    id: "endDate",
    name: "endDate",
    type: "date",
    placeholder: "Ending Date",
    className: "rounded-md",
    event: "event",
    validate: (value) => {
      if (!value) return "Required...";
      return "";
    },
  },
  {
    component: Select,
    id: "city",
    name: "city",
    type: "location",
    placeholder: "City",
    className: "rounded-md",
    event: "event",
    options: [
      { text: "Ahmedabad", value: "Ahmedabaad" },
      { text: "Gandhinagar", value: "Gandhinagar" },
      { text: "Amreli", value: "Amreli" },
      { text: "Junagadh", value: "Junagadh" },
    ],
    validate: (value) => {
      if (!value) return "Required...";
      return "";
    },
  },
  {
    component: TextInput,
    id: "location",
    name: "location",
    type: "location",
    placeholder: "Location",
    className: "rounded-md",
    event: "event",
    validate: (value) => {
      if (!value) return "Required...";
      return "";
    },
  },
  {
    component: TextInput,
    id: "photo",
    name: "photo",
    type: "file",
    placeholder: "Photo",
    className: "rounded-md",
    event: "event",
    validate: (value) => {
      if (!value) return "Required...";
      return "";
    },
  },
];

const CreateEvent = () => {
  const { logOut } = useContext(AuthContext);
  const { addEvent } = useContext(ProductContext);

  return (
    <div className="flex flex-col px-20">
      <FormikForm
        fields={fields}
        initialValues={{
          eventName: "",
          startDate: "",
          endDate: "",
          city: "",
          location: "",
          photo: "",
        }}
        onSubmit={addEvent}
        event
        btnText="Create Event"
      ></FormikForm>
      <button
        type="button"
        onClick={logOut}
        className="flex mt-6 py-3 items-center justify-center rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
      >
        Logout
      </button>
    </div>
  );
};

export default CreateEvent;
