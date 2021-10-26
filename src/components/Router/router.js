import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import App2 from "../2/2.js";
import App5 from "../5/5.js";
import Home from "../HomePage/HomePage.js";

class MainRouter extends React.Component {
  render() {
    const routes = [
      { path: "car-price" },
      { path: "color-changer" },
      { path: "prayer-times" },
      { path: "social-media" },
      { path: "metronome" },
      { path: "loan-calculator" },
      { path: "currency-converter" },
    ];
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={() => <Home routes={routes} />} />
          <Route path={`/${routes[1].path}`} component={App2} />
          <Route path={`/${routes[4].path}`} component={App5} />
        </Switch>
      </Router>
    );
  }
}

export default MainRouter;
