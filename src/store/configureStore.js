import { applyMiddleware, compose, createStore } from "redux";
import thunk from "redux-thunk";

import reducers from "../reducers/index";

const redux_devtools =
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();

const configureStore = () =>
  compose(applyMiddleware(thunk))(createStore)(reducers(), redux_devtools);

export default configureStore;
