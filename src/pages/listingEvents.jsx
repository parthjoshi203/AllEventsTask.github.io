import React, { useContext, useEffect, useState } from "react";
import { ProductContext } from "../context/eventContext";
import { XCircleIcon } from "@heroicons/react/20/solid";
import FormikForm from "../components/formikForm";
import Select from "../components/select";
import TextInput from "../components/textInput";

const fields = [
  {
    component: Select,
    id: "category",
    name: "category",
    placeholder: "Filter By Category",
    event: "event",
    options: [
      { text: "Business", value: "Business" },
      { text: "Education", value: "Education" },
      { text: "Arts and Entertainment", value: "Arts and Entertainment" },
      { text: "Community and Social", value: "Community and Social" },
      { text: "Sports and Fitness", value: "Sports and Fitness" },
      { text: "Technology", value: "Technology" },
    ],
  },
  {
    component: TextInput,
    id: "date",
    name: "date",
    type: "date",
    placeholder: "Filter By Date:",
    event: "event",
  },
  {
    component: Select,
    id: "city",
    name: "city",
    type: "text",
    placeholder: "Filter By City",
    event: "event",
    options: [
      { text: "Ahmedabad", value: "Ahmedabaad" },
      { text: "Gandhinagar", value: "Gandhinagar" },
      { text: "Amreli", value: "Amreli" },
      { text: "Junagadh", value: "Junagadh" },
    ],
  },
];

const AllEvents = () => {
  const {
    productsState: { products, loading, error },
    loadProducts,
  } = useContext(ProductContext);

  useEffect(() => {
    loadProducts();
  }, []);
  useEffect(() => {
    if (products) {
      setFilteredData(products);
    }
  }, [products]);

  const [filteredData, setFilteredData] = useState(null);

  const filterData = (values) => {
    const { date, category, city } = values;

    let filteredData = products.filter((item) => {
      if (item.startDate <= date) {
        if (item.endDate >= date) {
          return true;
        }
      }

      if (category && item.category !== category) {
        return false;
      }

      if (city && item.city !== city) {
        return false;
      }

      return true;
    });

    return filteredData;
  };

  const handleSubmit = (values, actions) => {
    try {
      const filteredData2 = filterData(values);
      if (filteredData2.length === 0) {
        alert("no records found");
      }
      setFilteredData(filteredData2);

      actions.resetForm();
    } catch (error) {
      console.log(error.message);
    }
  };

  if (loading) {
    return <h1>Loading...</h1>;
  }

  if (error) {
    return <h1>{error?.message}</h1>;
  }

  const handleClick = () => {
    setFilteredData(products);
  };

  return (
    <div className="flex w-full h-screen">
      <div className="w-1/4 mr-10 bg-green-300 h-screen">
        <FormikForm
          fields={fields}
          initialValues={{
            date: "",
            category: "",
            city: "",
          }}
          onSubmit={handleSubmit}
          btnText="Filter"
        />
      </div>
      <div className="flex flex-col flex-1">
        <div className="flex items-center mr-5">
          <h1 className="m-10 flex-1 text-center text-3xl font-bold">EVENTS</h1>
          {!(filteredData === products) && (
            <XCircleIcon
              className="h-7 w-7 -ml-7 justify-end text-gray-700 hover:text-gray-500"
              aria-hidden="true"
              onClick={handleClick}
            />
          )}
        </div>
        <div className=" flex-1 overflow-auto ">
          {filteredData &&
            filteredData.map((event, i) => (
              <div key={i} className="mb-5">
                <h3 className="flex gap-2">
                  <p className="font-medium text-gray-800"> EventName: </p>{" "}
                  {event.eventName}
                </h3>
                <h3 className="flex gap-2">
                  <p className="font-medium text-gray-800">Category: </p>
                  {event.category}
                </h3>
                <h3 className="flex gap-2">
                  <p className="font-medium text-gray-800">Location:</p>{" "}
                  {event.location}
                </h3>
                <h3 className="flex gap-2">
                  <p className="font-medium text-gray-800">Start Date: </p>
                  {event.startDate}
                </h3>
                <h3 className="flex gap-2">
                  <p className="font-medium text-gray-800">End Date: </p>
                  {event.endDate}
                </h3>
                <h3 className="flex gap-2">
                  <p className="font-medium text-gray-800">Photo:</p>{" "}
                  {event.photo}
                </h3>
                <h3 className="flex gap-2">
                  <p className="font-medium text-gray-800">City: </p>
                  {event.city}
                </h3>
                <h3 className="flex gap-2">
                  <p className="font-medium text-gray-800">Description: </p>
                  {event.description}
                </h3>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default AllEvents;
