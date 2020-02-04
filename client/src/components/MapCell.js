import React from "react";
import styled, { css } from "styled-components";

const Room = styled.div`
  flex: 1;
  border: 1px solid green;
  height: 50px;
  
    ${props =>
      props.exits.includes("north") &&
      css`
        border-top: none;
      `}

    ${props =>
      props.exits.includes("south") &&
      css`
        border-bottom: none;
      `}

    ${props =>
      props.exits.includes("west") &&
      css`
        border-left: none;
      `}

    ${props =>
      props.exits.includes("east") &&
      css`
        border-right: none;
      `}
`;

export default function MapCell({ room }) {
  console.log("room", room);
  return <Room exits={room.exits}></Room>;
}
