import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

const NavBar = styled.nav`
  display: flex;
  justify-content: space-around;
  width: 100%;
  padding: 20px 0;
  margin: 0px auto;
  background-color: lightgrey;
`;

const StyledNavLink = styled(NavLink)`
  text-decoration: none;
  color: blue;
`;
export default function() {
  return (
    <NavBar>
      <StyledNavLink to="/">Home</StyledNavLink>
      <StyledNavLink to="/login">Login</StyledNavLink>
      <StyledNavLink to="/register">Register</StyledNavLink>
      <StyledNavLink to="/game">Game</StyledNavLink>
    </NavBar>
  );
}
