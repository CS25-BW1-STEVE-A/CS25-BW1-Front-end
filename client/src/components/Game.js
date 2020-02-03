import React, { useState } from "react";
import axios from "axios";
import styled from "styled-components";
import {
  createBoard,
  baseURL,
  axiosWithAuth,
  checkCoordinates
} from "../utils/index";
import useEventListener from "../hooks/useEventListener";

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
  const [gameStarted, setGameStarted] = useState(false);
  const [board, setBoard] = useState(createBoard(10));
  const [position, setPosition] = useState([0, 0]);

  const handleClick = () => {
    // stuff here
    axiosWithAuth()
      .get(`${baseURL}/api/adv/init`)
      .then(res => {
        console.log("axios with auth", res);
        //start game
        setGameStarted(true);

        //set board based on position
        let copyBoard = [...board];
        copyBoard[position[0]][position[1]] = "X";
        console.log(copyBoard);
        setBoard(copyBoard);
      })
      .catch(err => console.log("axios with auth", err));
  };

  const moveCharacter = e => {
    console.log(e);
    let [row, col] = position;
    let copyBoard = [...board];
    if (e.key === "ArrowUp" && checkCoordinates(copyBoard, [row - 1, col])) {
      copyBoard[row][col] = "";
      copyBoard[row - 1][col] = "X";
      setBoard(copyBoard);
    }

    if (e.key === "ArrowDown" && checkCoordinates(copyBoard, [row + 1, col])) {
      copyBoard[row][col] = "";
      copyBoard[row + 1][col] = "X";
      setBoard(copyBoard);
    }

    if (e.key === "ArrowRight" && checkCoordinates(copyBoard, [row, col + 1])) {
      copyBoard[row][col] = "";
      copyBoard[row][col + 1] = "X";
      setBoard(copyBoard);
    }

    if (e.key === "ArrowUp" && checkCoordinates(copyBoard, [row, col - 1])) {
      copyBoard[row][col] = "";
      copyBoard[row][col - 1] = "X";
      setBoard(copyBoard);
    }
  };

  useEventListener("keydown", moveCharacter);
  return (
    <div>
      <h1>This is the best game</h1>
      <button onClick={handleClick}>Start Game</button>
      <Board className="board" onKeyPress={moveCharacter}>
        {board.map((row, rowIdx) => {
          return (
            <Row key={rowIdx} className="row">
              {board[rowIdx].map((col, colIdx) => {
                return (
                  <Cell key={colIdx} className="cell">
                    {col}
                  </Cell>
                );
              })}
            </Row>
          );
        })}
      </Board>
    </div>
  );
}
