import React from "react";
import {render} from "react-dom";
import injectTapEventPlugin from "react-tap-event-plugin";
import { Router, Route, Link, browserHistory, IndexRoute } from "react-router";
import Main from "./Main";
import SWEFeed from "./components/pages/SWEFeed";
import SWEExpeditionPage from "./components/pages/SWEExpeditionPage";

injectTapEventPlugin();

render(
  <Router history={browserHistory}>
    <Route path="/" component={Main} >
      <IndexRoute component={SWEFeed}/>
      <Route path="expeditions/:id" component={SWEExpeditionPage}/>
    </Route>
  </Router>,
  document.getElementById("app")
);
