import React from "react";
import styled, { css } from "styled-components";
import {
  roomWall,
  roomDoor,
  roomFloor,
  roomChicken,
  roomIcon
} from "../utils/typeOfRoom";

const Cell = styled.div`
  width: 50px;
  height: 50px;
  font-size: 2rem;
  position: relative;
  
  ${props =>
    props.floor &&
    css`
      ${roomFloor(props.typeOfRoom)}
    `}

  ${props =>
    props.door &&
    css`
      ${roomDoor(props.typeOfRoom)}
    `}

  ${props =>
    props.wall &&
    css`
      ${roomWall(props.typeOfRoom)}
    `};

  ${props =>
    props.chicken &&
    css`
      ${roomChicken(props.typeOfRoom)}
    `};
`;

export default function({ colIdx, rowIdx, state }) {
  const door = state.room.board[rowIdx][colIdx] === "Door" ? true : false;
  const wall = state.room.board[rowIdx][colIdx] === "Wall" ? true : false;
  const chicken = state.room.board[rowIdx][colIdx] === "🐓" ? true : false;
  const floor = state.room.board[rowIdx][colIdx] === "" ? true : false;

  return (
    <Cell
      typeOfRoom={state.room.type}
      className="cell"
      door={door}
      wall={wall}
      chicken={chicken}
      floor={!(door || wall || chicken)}
    >
      {state.player.coordinates[0] === rowIdx &&
      state.player.coordinates[1] === colIdx
        ? roomIcon(state.room.type)
        : ""}
      {chicken ? "🐓" : ""}
    </Cell>
  );
}
