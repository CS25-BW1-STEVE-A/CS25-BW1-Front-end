import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import PrivateRoute from "./components/PrivateRoute";
import Game from "./components/Game";
import Layout from "./components/Layout";

function App() {
  return (
    <>
      <Router>
        <Layout>
          <Switch>
            <PrivateRoute path="/game">
              <Game />
            </PrivateRoute>
            <Route path="/">
              <LandingPage />
            </Route>
          </Switch>
        </Layout>
      </Router>
    </>
  );
}

export default App;
