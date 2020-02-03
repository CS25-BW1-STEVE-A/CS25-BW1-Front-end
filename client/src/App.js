import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import PrivateRoute from "./components/PrivateRoute";
import Game from "./components/Game";

function App() {
  return (
    <>
      <Router>
        <Switch>
          <PrivateRoute path="/game">
            <Game />
          </PrivateRoute>
          <Route path="/">
            <LandingPage />
          </Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;
