import React from "react";
import styled from "styled-components";
import Cell from "./Cell";

const Board = styled.div`
  max-width: 500px;
  margin: 20px auto;
`;

const Row = styled.div`
  display: flex;
`;

export default function Room({ state }) {
  return (
    <Board className="board">
      <h2>{state.room.name}</h2>
      {state.room.board.map((row, rowIdx) => {
        return (
          <Row key={rowIdx} className="row">
            {state.room.board[rowIdx].map((col, colIdx) => {
              return <Cell state={state} colIdx={colIdx} rowIdx={rowIdx} />;
            })}
          </Row>
        );
      })}
    </Board>
  );
}
