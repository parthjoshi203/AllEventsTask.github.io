import React, {
  createContext,
  useCallback,
  useMemo,
  useReducer,
  useState,
} from "react";
import axiosInstance from "../utils/axiosInstance";
import { eventsInitialState, eventsReducer } from "../reducers/eventsReducer";

export const EventContext = createContext();

export const EventProvider = ({ children }) => {
  const [events, setEvents] = useState([]);
  const [eventsState, dispatch] = useReducer(eventsReducer, eventsInitialState);

  const loadEvents = useCallback(async () => {
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
      eventsState,
      loadEvents,
      addEvent,
      getEvents,
      events,
    }),
    [eventsState]
  );

  return (
    <EventContext.Provider value={value}>{children}</EventContext.Provider>
  );
};
