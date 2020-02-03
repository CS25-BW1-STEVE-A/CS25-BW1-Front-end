import React from "react";
import { createBoard, baseURL, axiosWithAuth } from "../utils/index";
import axios from "axios";
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

export default function() {
  const [gameStarted, setGameStarted] = React.useState(false);
  const [board, setBoard] = React.useState(createBoard(10));

  const handleClick = () => {
    // stuff here
    axiosWithAuth()
      .get(`${baseURL}/api/adv/init`)
      .then(res => console.log("axios with auth", res))
      .catch(err => console.log("axios with auth", err));
  };
  return (
    <div>
      <h1>This is the best game</h1>
      <button onClick={handleClick}>Start Game</button>
      <Board className="board">
        {board.map((row, rowIdx) => {
          return (
            <Row className="row">
              {board[rowIdx].map((col, colIdx) => {
                return <Cell className="cell">{col}</Cell>;
              })}
            </Row>
          );
        })}
      </Board>
    </div>
  );
}
