import React from "react";
import styled, { keyframes } from "styled-components";

const move = keyframes`
  from {
    transform: translateX(0%);
  }

  to {
    transform: translateX(100%);
  }
`;

const Chicken = styled.p`
  animation-name: ${move};
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
