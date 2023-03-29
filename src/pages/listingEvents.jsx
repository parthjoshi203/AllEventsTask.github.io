import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { ProductContext } from "../context/productContext";
import { XCircleIcon } from "@heroicons/react/20/solid";
import TextInput from "../components/textInput";
import FormikForm from "../components/formikForm";
import Select from "../components/select";

const fields = [
  {
    component: TextInput,
    id: "date",
    name: "date",
    type: "date",
    placeholder: "Filter data by Date:",
    event: "event",
  },
  {
    component: TextInput,
    id: "category",
    name: "category",
    type: "text",
    placeholder: "Filter data by Category:",
    event: "event",
  },
  {
    component: Select,
    id: "city",
    name: "city",
    type: "location",
    placeholder: "City",
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
  console.log("f", filteredData);
  // const [filterType, setFilterType] = useState("all");
  // const [filteredData, setFilteredData] = useState(products);

  //start
  // const [filters, setFilters] = useState({});

  // const handleFilterChange = (event) => {
  //   const { name, value } = event.target;
  //   setFilters((prevFilters) => ({ ...prevFilters, [name]: value }));
  // };

  // const handleFormSubmit = (event) => {
  //   // setFilters((prevFilters) => ({ ...prevFilters, [name]: value }));
  //   const filtered = products.filter((item) => {
  //     let match = true;
  //     for (const key in filters) {
  //       if (item[key] !== filters[key]) {
  //         match = false;
  //         break;
  //       }
  //     }
  //     return match;
  //   });
  //   setFilteredData(filtered);
  // };

  // console.log("r", filteredData);

  // const filterBtns = useMemo(
  //   () => [
  //     {
  //       text: "Filter By Ca",
  //       value: "all",
  //     },
  //     {
  //       text: "Pending",
  //       value: "pending",
  //     },
  //     {
  //       text: "Completed",
  //       value: "completed",
  //     },
  //     {
  //       text: "none",
  //       value: "none",
  //     },
  //   ],
  //   []
  // );

  // const changeFilterType = useCallback((ft) => {
  //   setFilterType(ft);
  // }, []);

  // const handleFilter = (filters) => {
  //   const filtered = products.filter((item) => {
  //     let match = true;
  //     for (const key in filters) {
  //       if (item[key] !== filters[key]) {
  //         match = false;
  //         break;
  //       }
  //     }
  //     return match;
  //   });
  //   setFilteredData(filtered);
  // };

  const filterData = (values) => {
    const { date, category, city } = values;

    // filter the data based on the selected filter options
    let filteredData = products.filter((item) => {
      // check if item matches filterOption1
      if (date && item.date !== date) {
        return false;
      }

      // check if item matches filterOption2
      if (category && item.category !== category) {
        return false;
      }

      // check if item matches filterOption3
      if (city && item.city !== city) {
        return false;
      }

      return true;
    });

    return filteredData;
  };

  const handleSubmit = (values, actions) => {
    const filteredData2 = filterData(values);
    setFilteredData(filteredData2);

    actions.resetForm();
  };

  if (loading) {
    return <h1>Loading...</h1>;
  }

  if (error) {
    return <h1>{error?.message}</h1>;
  }

  const han = () => {
    setFilteredData(products);
  };

  return (
    <div className="flex w-full h-screen">
      <div className="w-1/4 mr-10 bg-green-300 h-screen">
        {/* <form className="flex flex-col gap-3" onSubmit={handleFormSubmit}>
          <label>
            <p>Filter data by Date:</p>
            <input type="date" name="date" onChange={handleFilterChange} />
          </label>
          <label>
            <p>Filter data by Category:</p>
            <input type="" name="age" onChange={handleFilterChange} />
          </label>
          <label>
            <p>Filter data by City:</p>
            <select name="city" onChange={handleFilterChange}>
              <option>--Select--</option>
              <option value="Ahmedabad">Ahmedabad</option>
              <option value="Amreli">Amreli</option>
              <option value="Junagadh">Junagadh</option>
              <option value="Gandhinagar">Gandhinagar</option>
            </select>
          </label>
          <button
            type="submit"
            className="justify-center bg-red-500 mx-auto px-10 rounded-md"
          >
            Filter
          </button>
        </form> */}
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
              onClick={han}
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
                  <p className="font-medium text-gray-800">Location:</p>{" "}
                  {event.location}
                </h3>
                <h3 className="flex gap-2">
                  <p className="font-medium text-gray-800">Date: </p>
                  {event.startDate}
                </h3>
                <h3 className="flex gap-2">
                  <p className="font-medium text-gray-800">Date: </p>
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
              </div>
            ))}
        </div>
        {/* <div className="w-full flex-1 overflow-auto ">
        {filteredData.map((event, i) => (
          <div key={i} className="mb-4">
            <h2>{event.eventName}</h2>
            <p>{event.location}</p>
            <p>Location: {event.location}</p>
            <p>Date: {event.startDate}</p>
            <p>Date: {event.endDate}</p>
            <p>Email: {event.userEmail}</p>
            <p>Photo: {event.photo}</p>
            <p>City: {event.city}</p>
          </div>
        ))}
      </div> */}

        {/* <div className="w-full flex">
        {filterBtns.map((item) => (
          <button
            key={item.value}
            className="btn flex-1 rounded-none inline-flex justify-center border border-transparent bg-indigo-600 py-2 px-4 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            type="button"
            onClick={() => {
              changeFilterType(item.value);
              handleFilter({ city: "Amreli" });
            }}
          >
            {item.text}
          </button>
        ))}
      </div> */}
      </div>
    </div>
  );
};

export default AllEvents;

// import React, {
//   useCallback,
//   useContext,
//   useEffect,
//   useMemo,
//   useState,
// } from "react";
// import { ProductContext } from "../context/productContext";

// const AllEvents = () => {
//   const {
//     productsState: { products, loading, error },
//     loadProducts,
//   } = useContext(ProductContext);

//   useEffect(() => {
//     loadProducts();
//   }, []);
//   const [filterType, setFilterType] = useState("all");
//   const [filteredData, setFilteredData] = useState(products);

//   console.log("r", filteredData);

//   const filterBtns = useMemo(
//     () => [
//       {
//         text: "All",
//         value: "all",
//       },
//       {
//         text: "Pending",
//         value: "pending",
//       },
//       {
//         text: "Completed",
//         value: "completed",
//       },
//       {
//         text: "none",
//         value: "none",
//       },
//     ],
//     []
//   );

//   const changeFilterType = useCallback((ft) => {
//     setFilterType(ft);
//   }, []);

//   const handleFilter = (filters) => {
//     const filtered = products.filter((item) => {
//       let match = true;
//       for (const key in filters) {
//         if (item[key] !== filters[key]) {
//           match = false;
//           break;
//         }
//       }
//       return match;
//     });
//     setFilteredData(filtered);
//   };

//   if (loading) {
//     return <h1>Loading...</h1>;
//   }

//   if (error) {
//     return <h1>{error?.message}</h1>;
//   }

//   return (
//     <div className="flex flex-col items-center h-screen">
//       <h1 className="m-10  text-black text-center">EVENTS</h1>
//       <div className="w-full flex-1 overflow-auto ">
//         {filteredData.map((event, i) => (
//           <div key={i} className="mb-4">
//             <h2>{event.eventName}</h2>
//             <p>{event.location}</p>
//             <p>Location: {event.location}</p>
//             <p>Date: {event.startDate}</p>
//             <p>Date: {event.endDate}</p>
//             <p>Email: {event.userEmail}</p>
//             <p>Photo: {event.photo}</p>
//             <p>City: {event.city}</p>
//             {/* add more event details as needed */}
//           </div>
//         ))}
//       </div>

//       <div className="w-full flex">
//         {filterBtns.map((item) => (
//           <button
//             key={item.value}
//             className="btn flex-1 rounded-none inline-flex justify-center border border-transparent bg-indigo-600 py-2 px-4 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
//             type="button"
//             onClick={() => {
//               changeFilterType(item.value);
//               handleFilter({ city: "Amreli" });
//             }}
//           >
//             {item.text}
//           </button>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default AllEvents;
