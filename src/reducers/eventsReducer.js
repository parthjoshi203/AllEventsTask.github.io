export const eventsInitialState = {
  events: [],
  loading: false,
  error: null,
};

export const eventsReducer = (state, { type, payload }) => {
  switch (type) {
    case "LOAD_EVENTS_REQUEST":
      return { ...state, loading: true };

    case "LOAD_EVENTS_SUCCESS":
      return { ...state, loading: false, events: payload };

    case "LOAD_EVENTTS_FAIL":
      return { ...state, loading: false, error: payload };

    default:
      return state;
  }
};
