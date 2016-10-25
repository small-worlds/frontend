import React from "react";
import {render} from "react-dom";
import injectTapEventPlugin from "react-tap-event-plugin";
import { Router, Route, Link, browserHistory } from "react-router";
import Main from "./Main";

injectTapEventPlugin();

render(
  <Router history={browserHistory}>
    <Route path="/" component={Main}>
    </Route>
  </Router>,
  document.getElementById("app")
);
