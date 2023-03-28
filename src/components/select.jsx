import clsx from "clsx";
import React from "react";

const Select = ({
  field,
  form: { touched, errors },
  meta,
  className,
  options,
  ...props
}) => {
  return (
    <div>
      <label htmlFor={props.id}>{props.id}</label>
      <select
        className={clsx(
          "relative block w-full appearance-none border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm",
          {
            [className]: !!className,
          }
        )}
        {...field}
        {...props}
      >
        <option>{props.placeholder}</option>
        {options.map((x) => (
          <option key={x.value} value={x.value}>
            {x.text}
          </option>
        ))}
      </select>
      {touched[field.name] && errors[field.name] && (
        <p className="text-red-500 text-sm mt-2">{errors[field.name]}</p>
      )}
    </div>
  );
};

export default Select;
