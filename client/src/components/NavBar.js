import React from "react";
import { NavLink } from "react-router-dom";

export default function() {
  return (
    <nav>
      <NavLink to="/">Home</NavLink>
      <NavLink to="/game">Game</NavLink>
    </nav>
  );
}
