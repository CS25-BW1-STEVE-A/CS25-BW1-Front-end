import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { createGlobalStyle } from "styled-components";
import LandingPage from "./components/LandingPage";
import PrivateRoute from "./components/PrivateRoute";
import Game from "./components/Game";
import Layout from "./components/Layout";
import Login from "./components/Login";
import Register from "./components/Register";

const Global = createGlobalStyle` 
  
  body {
    margin: 0;
    background-color: #FBF9F7;
    font-family: "Play", sans-serif;
  }

  @keyframes slidein {
    from {
      transform: translateX(0%);
    }

    to {
      transform: translateX(100%);
    }
  }
`;

function App() {
  return (
    <>
      <Router>
        <Global />
        <Layout>
          <Switch>
            <PrivateRoute path="/game">
              <Game />
            </PrivateRoute>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/register">
              <Register />
            </Route>
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
