import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./Components/App";
import Login from "./Components/Login";
import SignUp from "./Components/SignUp";
import { BrowserRouter } from "react-router-dom";
import { Route, Switch } from "react-router-dom";
import { createStore } from "redux";
import rootReducer from "./reducers/index";
import { Provider } from "react-redux";

const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        <Route exact path={"/signup"} component={SignUp} />
        <Route exact path={"/login"} component={Login} />
        <App />
      </Switch>
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
