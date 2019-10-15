import {
  GET_DATA_ERRORED,
  GET_DATA_LOADING,
  GET_DATA_SUCCESS
} from "./actionTypes";
import { getCountries } from "../api/countriesAPI";

export const dataHasErrored = error => ({
  type: GET_DATA_ERRORED,
  payload: error
});

export const dataIsLoading = () => ({
  type: GET_DATA_LOADING
});

export const dataFetchSuccess = countries => ({
  type: GET_DATA_SUCCESS,
  payload: countries
});

export const itemsFetchData = () => dispatch => {
  dispatch(dataIsLoading());

  getCountries()
    .then(response => {
      const countries = response.map(country => country.name);

      dispatch(dataFetchSuccess(countries));
    })
    .catch(error => dispatch(dataHasErrored(error)));
};
