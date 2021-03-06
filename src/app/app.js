import React from "react";
import {render} from "react-dom";
import injectTapEventPlugin from "react-tap-event-plugin";
import { Router, Route, Link, browserHistory, IndexRoute } from "react-router";
import Main from "./Main";
import SWEFeed from "./components/pages/SWEFeed";
import SWEExpeditionPage from "./components/pages/SWEExpeditionPage";
import SWEBadgeGeneratorPage from "./components/pages/SWEBadgeGeneratorPage";
import SWEExpeditionRegisterCard from "./components/organisms/SWEExpeditionRegisterCard";
import SWEActivateCard from "./components/organisms/SWEActivateCard";

injectTapEventPlugin();

render(
  <Router history={browserHistory}>
    <Route path="/" component={Main} >
      <IndexRoute component={SWEFeed}/>
      <Route path="/badgegenerator/" component={SWEBadgeGeneratorPage}/>
      <Route path="/expeditions/:id" component={SWEExpeditionPage}/>
      <Route path="/expeditions/:id/register" component={SWEExpeditionRegisterCard}/>
      <Route path="/activate/:id/:token" component={SWEActivateCard} />
    </Route>
  </Router>,
  document.getElementById("app")
);
