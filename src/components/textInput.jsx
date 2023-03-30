import React from "react";
import clsx from "clsx";

const TextInput = ({
  field,
  form: { touched, errors },
  meta,
  className,
  ...props
}) => {
  return (
    <div>
      <label
        htmlFor={props.id}
        className={clsx("text-gray-800", {
          "sr-only": !props.event,
        })}
      >
        {props?.placeholder}
      </label>
      <input
        className={clsx(
          "relative block w-full appearance-none  border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm",
          {
            [className]: !!className,
          }
        )}
        type={props.type}
        {...field}
        {...props}
      />
      {touched[field.name] && errors[field.name] && (
        <p className="text-red-500 text-sm mt-2">{errors[field.name]}</p>
      )}
    </div>
  );
};

export default TextInput;
