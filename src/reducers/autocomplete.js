import {
  GET_DATA_ERRORED,
  GET_DATA_LOADING,
  GET_DATA_SUCCESS
} from "../actions/actionTypes.js";

export const initialState = {
  countries: [],
  error: "",
  loading: true
};

const countries = (state = initialState, { type, payload } = {}) => {
  switch (type) {
    case GET_DATA_LOADING: {
      return {
        ...state,
        loading: true
      };
    }
    case GET_DATA_SUCCESS: {
      return {
        ...state,
        loading: false,
        countries: payload
      };
    }
    case GET_DATA_ERRORED: {
      return {
        ...state,
        loading: false,
        error: payload
      };
    }
    default:
      return state;
  }
};
export default countries;
