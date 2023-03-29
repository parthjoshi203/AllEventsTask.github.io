import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useReducer,
} from "react";
import axiosInstance from "../utils/axiosInstance";
import {
  productsInitialState,
  productsReducer,
} from "../reducers/productsReducer";
import { AuthContext } from "./authContext";

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [productsState, dispatch] = useReducer(
    productsReducer,
    productsInitialState
  );

  const loadProducts = useCallback(async () => {
    try {
      dispatch({ type: "LOAD_PRODUCTS_REQUEST" });
      const res = await axiosInstance.get("660/products");
      dispatch({ type: "LOAD_PRODUCTS_SUCCESS", payload: res });
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

  const value = useMemo(
    () => ({
      productsState,
      loadProducts,
      addEvent,
    }),
    [productsState]
  );

  return (
    <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
  );
};
