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

const KEY_CODES = {
  ArrowUp: "UP",
  ArrowDown: "DOWN",
  ArrowLeft: "LEFT",
  ArrowRight: "RIGHT"
};

const VECTORS = {
  UP: [-1, 0],
  DOWN: [1, 0],
  LEFT: [0, -1],
  RIGHT: [0, 1]
};

function updatePosition(board, direction, currentPosition) {
  let newPositionRow = currentPosition[0] + VECTORS[direction][0];
  let newPositionCol = currentPosition[1] + VECTORS[direction][1];
  let newPosition = [newPositionRow, newPositionCol];
  if (checkCoordinates(board, newPosition)) {
    return newPosition;
  } else {
    return currentPosition;
  }
}

const initialState = {
  game: {
    board: createBoard(10),
    isGameOver: true
  },
  player: {
    coordinates: [-Infinity, Infinity],
    direction: ""
  },
  room: {
    coordinates: [0, 0],
    title: "Some room"
  }
};

const reducer = (state, action) => {
  switch (action.type) {
    case "MOVE_PLAYER":
      return {
        ...state,
        player: {
          ...state.player,
          coordinates: updatePosition(
            state.game.board,
            action.direction,
            state.player.coordinates
          )
        },
        room: {
          ...state.room,
          coordinates: action.coordinates
        }
      };
    case "GAME_START":
      console.log(action);
      return {
        ...state,
        game: {
          ...state.game,
          isGameOver: false
        },
        player: {
          ...state.player,
          coordinates: action.startingPosition
        }
      };
  }
};

export default function() {
  const [gameStarted, setGameStarted] = useState(false);

  const [state, dispatch] = React.useReducer(reducer, initialState);

  const handleClick = () => {
    // stuff here
    axiosWithAuth()
      .get(`${baseURL}/api/adv/init`)
      .then(res => {
        console.log("axios with auth", res);
        //start game
        dispatch({ type: "GAME_START", startingPosition: [0, 0] });
      })
      .catch(err => console.log("axios with auth", err));
  };

  console.log("the state is", state);

  const moveCharacter = e => {
    if (KEY_CODES[e.key]) {
      //make sure coordinates would work
      dispatch({
        type: "MOVE_PLAYER",
        direction: KEY_CODES[e.key]
      });
    }
  };

  useEventListener("keydown", moveCharacter);
  return (
    <div>
      <h1>This is the best game</h1>
      <button onClick={handleClick}>Start Game</button>
      <Board className="board" onKeyPress={moveCharacter}>
        {state.game.board.map((row, rowIdx) => {
          return (
            <Row key={rowIdx} className="row">
              {state.game.board[rowIdx].map((col, colIdx) => {
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
    </div>
  );
}
