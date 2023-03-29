import React, {
  createContext,
  useCallback,
  useMemo,
  useReducer,
  useState,
} from "react";
import axiosInstance from "../utils/axiosInstance";
import {
  productsInitialState,
  productsReducer,
} from "../reducers/productsReducer";

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [events, setEvents] = useState([]);
  const [productsState, dispatch] = useReducer(
    productsReducer,
    productsInitialState
  );

  const loadProducts = useCallback(async () => {
    try {
      dispatch({ type: "LOAD_PRODUCTS_REQUEST" });
      const res = await axiosInstance.get("event/get");
      console.log("res", res.result);
      console.log("typo", typeof res);
      dispatch({ type: "LOAD_PRODUCTS_SUCCESS", payload: res.result });
    } catch (error) {
      dispatch({ type: "LOAD_PRODUCTS_FAIL", payload: error });
    }
  }, []);

  const addEvent = useCallback(async (values, actions) => {
    const email = JSON.parse(window.localStorage.getItem("token")).result.user
      .email;

    try {
      const { eventName, startDate, endDate, city, location, photo } = values;
      const request = {
        eventName,
        startDate,
        endDate,
        city,
        location,
        photo,
        userEmail: email,
      };
      console.log(request);
      const res = await axiosInstance.post("event/add", request);
      console.log(res);
      actions.resetForm();
    } catch (error) {
      console.log(JSON.stringify(error));
      actions.setErrors({
        serverError: error.message,
      });
    }
  }, []);

  const getEvents = useCallback(async () => {
    try {
      console.log("hy");
      const res = await axiosInstance.get("event/get");
      console.log("type", typeof res);
      // const data = await res.json();
      console.log(res);
      setEvents(res);
    } catch (error) {
      // console.log(JSON.stringify(error));
      console.log(error.message);
    }
  }, []);

  const value = useMemo(
    () => ({
      productsState,
      loadProducts,
      addEvent,
      getEvents,
      events,
    }),
    [productsState]
  );

  return (
    <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
  );
};
