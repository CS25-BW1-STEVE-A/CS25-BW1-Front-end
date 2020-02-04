import React from "react";
import styled, { css } from "styled-components";

const Cell = styled.div`
  width: 50px;
  height: 50px;
  border: 1px solid black;
  ${props =>
    props.door &&
    css`
      background: brown;
    `}
  ${props =>
    props.wall &&
    css`
      background: black;
    `}
`;

export default function({ colIdx, rowIdx, state }) {
  const door = state.room.board[rowIdx][colIdx] === "Door" ? true : false;
  const wall = state.room.board[rowIdx][colIdx] === "Wall" ? true : false;
  const chicken = state.room.board[rowIdx][colIdx] === "🐓" ? true : false;

  return (
    <Cell className="cell" door={door} wall={wall}>
      {state.player.coordinates[0] === rowIdx &&
      state.player.coordinates[1] === colIdx
        ? "X"
        : ""}
      {chicken ? "🐓" : ""}
    </Cell>
  );
}
