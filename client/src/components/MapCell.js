import React from "react";
import styled, { css } from "styled-components";

const MiniMapRoom = styled.div`
  flex: 1;
  border: 1px solid green;
  height: 50px;
  
    ${props =>
      props.isCurrentRoom &&
      css`
        background-color: #4e4eb2;
      `}
  
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

//col is an array of cells for the room
export default function MapCell({ col, isCurrentRoom }) {
  console.log("col inside MiniMap MapCell", col);
  return (
    <MiniMapRoom exits={col.exits} isCurrentRoom={isCurrentRoom}></MiniMapRoom>
  );
}
