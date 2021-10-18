import React from "react";
import { Switch, BrowserRouter as Router, Route } from "react-router-dom";
import { Layout } from "./components";
import { AddPlayer, Home, Player, Team } from "./pages";

const Routes = () => {
  const renderComponent = (Component) => (
    <Layout>
      <Component />
    </Layout>
  );
  return (
    <Router>
      <Switch>
        <Route path="/" exact render={() => renderComponent(Home)} />
        <Route
          path="/add-player"
          exact
          render={() => renderComponent(AddPlayer)}
        />
        <Route path="/:team" exact render={() => renderComponent(Team)} />
        <Route
          path="/player/:id"
          exact
          render={() => renderComponent(Player)}
        />
      </Switch>
    </Router>
  );
};

export default Routes;
