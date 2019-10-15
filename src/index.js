import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import configureStore from "./store/configureStore";

import FormikApp from "./App";

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <FormikApp />
  </Provider>,
  document.getElementById("root")
);
