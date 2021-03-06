import React from "react";
import styled from "styled-components";
import Cell from "./Cell";

const Board = styled.div`
  margin: 0px auto;
`;

const Row = styled.div`
  display: flex;
`;

export default function Room({ state }) {
  return (
    <Board className="board">
      {state.room.board.map((row, rowIdx) => {
        return (
          <Row key={rowIdx} className="row">
            {state.room.board[rowIdx].map((col, colIdx) => {
              return (
                <Cell
                  state={state}
                  key={colIdx}
                  colIdx={colIdx}
                  rowIdx={rowIdx}
                />
              );
            })}
          </Row>
        );
      })}
    </Board>
  );
}
