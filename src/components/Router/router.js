import React from "react";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import App1 from "../1/1.js";
import App2 from "../2/2.js";
import App3 from "../3/3.js";
import App5 from "../5/5.js";
import App6 from "../6/6.js";
import App7 from "../7/7.js";
import Home from "../HomePage/HomePage.js";
import Detail from "../3/helper/detail.js";

class MainRouter extends React.Component {
  render() {
    const routes = [
      { path: "car-price", component: App1},
      { path: "color-changer", component: App2 },
      { path: "prayer-times", component: App3 },
      { path: "social-media", component: "" },
      { path: "metronome", component: App5 },
      { path: "loan-calculator", component: App6 },
      { path: "currency-converter", component: App7 },
    ];
    return (
      <Router basename={process.env.PUBLIC_URL}>
        <Switch>
          <Route exact path="/" component={() => <Home routes={routes} />} />
          {routes.map(function(route, i){
              return <Route key={i} exact path={`/${routes[i].path}`} component={route.component} />;
          })}
          <Route exact path={`/prayer-times/details/:date_param`} component={Detail} />;
          <Route path="*" component={() => <Redirect to="/" />} />
        </Switch>
      </Router>
    );
  }
}

export default MainRouter;
