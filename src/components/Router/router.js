import React from "react";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import App2 from "../2/2.js";
import App3 from "../3/3.js";
import App5 from "../5/5.js";
import Home from "../HomePage/HomePage.js";
import Detail from "../3/helper/detail.js";

class MainRouter extends React.Component {
  render() {
    const routes = [
      { path: "car-price", component: ""},
      { path: "color-changer", component: App2 },
      { path: "prayer-times", component: App3 },
      { path: "social-media", component: "" },
      { path: "metronome", component: App5 },
      { path: "loan-calculator", component: "" },
      { path: "currency-converter", component: "" },
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
