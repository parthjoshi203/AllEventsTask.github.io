import React, { useContext, useEffect, useState } from "react";
import { ProductContext } from "../context/productContext";

const AllEvents = () => {
  //   const { events, getEvents } = useContext(ProductContext);
  const {
    productsState: { products, loading, error },
    loadProducts,
  } = useContext(ProductContext);

  useEffect(() => {
    loadProducts();
  }, []);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  if (error) {
    return <h1>{error?.message}</h1>;
  }
  //   if (events?.length === 0) {
  //     <p>Loading events data...</p>;
  //   }

  return (
    <div>
      {/* <button
        type="button"
        onClick={getEvents}
        className="flex  w-full mt-6 py-3 items-center justify-center rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
      >
        Logout
      </button> */}
      {products.map((event, i) => (
        <div key={i}>
          <h2>{event.eventName}</h2>
          <p>{event.location}</p>
          <p>Location: {event.location}</p>
          <p>Date: {event.startDate}</p>
          <p>Date: {event.endDate}</p>
          <p>Email: {event.userEmail}</p>
          <p>Photo: {event.photo}</p>
          <p>City: {event.city}</p>
          {/* add more event details as needed */}
        </div>
      ))}
    </div>
  );
};

export default AllEvents;
