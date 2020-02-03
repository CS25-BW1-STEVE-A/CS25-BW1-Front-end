import React from "react";
import styled from "styled-components";

const Board = styled.div`
  max-width: 500px;
  margin: 20px auto;
`;

const Cell = styled.div`
  width: 50px;
  height: 50px;
  border: 1px solid black;
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
              return (
                <Cell key={colIdx} className="cell">
                  {state.player.coordinates[0] === rowIdx &&
                  state.player.coordinates[1] === colIdx
                    ? "X"
                    : ""}
                </Cell>
              );
            })}
          </Row>
        );
      })}
    </Board>
  );
}
