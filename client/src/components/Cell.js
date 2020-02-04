import React from "react";
import styled, { css } from "styled-components";

const Cell = styled.div`
  width: 50px;
  height: 50px;
  border: 0px solid black;
  font-size: 2rem;

  ${props =>
    props.door &&
    css`
      ${"" /* background: url(${door}); */}
      background-color: brown;
      position: relative;
      &:before {
        content: "";
        position: absolute;
        width: 40px;
        height: 40px;
        background-color: black;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }
    `}
  ${props =>
    props.wall &&
    css`
      position: relative;
      background-color: #ddcbbe;

      &:before {
        content: "";
        position: absolute;
        width: 40px;
        height: 40px;
        background-color: #985040;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }
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
        ? "🏃‍♀️"
        : ""}
      {chicken ? "🐓" : ""}
    </Cell>
  );
}
