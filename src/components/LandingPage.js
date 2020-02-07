import React from "react";
import styled from "styled-components";

const Chicken = styled.p`
  animation-name: slidein;
  animation-duration: 10s;
  animation-iteration-count: infinite;
  animation-direction: reverse;
  animation-timing-function: linear;
  font-size: 4rem;
`;

const LandingTitle = styled.h2`
  text-align: center;
`;

const LandingPage = () => {
  return (
    <div>
      <LandingTitle>Chicken Runner</LandingTitle>
      <Chicken>🐓&nbsp;&nbsp;&nbsp;&nbsp;🏃‍♀️</Chicken>
    </div>
  );
};

export default LandingPage;
