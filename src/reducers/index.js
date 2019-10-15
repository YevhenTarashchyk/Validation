import { combineReducers } from "redux";
import countries from "./autocomplete";

export default () =>
  combineReducers({
    countries
  });
