import clsx from "clsx";
import { Field, Form, Formik } from "formik";
import React from "react";

const FormikForm = ({ btnText, fields, children, placeholder, ...rest }) => {
  return (
    <Formik {...rest}>
      {({ errors }) => (
        <Form className="space-y-6">
          <input type="hidden" name="remember" defaultValue="true" />
          {errors.serverError && (
            <p className="text-red-500 text-center text-2xl">
              {errors.serverError}
            </p>
          )}
          <div
            className={clsx("-space-y-px rounded-md shadow-sm", {
              "space-y-3": !!rest.event,
            })}
          >
            {fields.map((x) => (
              <Field key={x.id} {...x} />
            ))}
          </div>

          {children}

          <div>
            <button
              type="submit"
              className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              {btnText}
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default FormikForm;
