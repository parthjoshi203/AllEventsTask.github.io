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
} from "../reducers/eventsReducer";

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [events, setEvents] = useState([]);
  const [productsState, dispatch] = useReducer(
    productsReducer,
    productsInitialState
  );

  const loadProducts = useCallback(async () => {
    try {
      dispatch({ type: "LOAD_EVENTS_REQUEST" });
      const res = await axiosInstance.get("event/get");
      dispatch({ type: "LOAD_EVENTS_SUCCESS", payload: res.result });
    } catch (error) {
      dispatch({ type: "LOAD_EVENTS_FAIL", payload: error });
    }
  }, []);

  const addEvent = useCallback(async (values, actions) => {
    const email = JSON.parse(window.localStorage.getItem("token")).result.user
      .email;

    try {
      const request = { ...values, userEmail: email };
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
      const res = await axiosInstance.get("event/get");
      console.log(res);
      setEvents(res);
    } catch (error) {
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
