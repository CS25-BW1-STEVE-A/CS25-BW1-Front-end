import { createBoard, checkCoordinates } from "../utils/index";

export const KEY_CODES = {
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

export const initialState = {
  game: {
    board: createBoard(10),
    isGameOver: true
  },
  player: {
    coordinates: [-Infinity, Infinity],
    direction: ""
  },
  room: {
    board: createBoard(5),
    coordinates: [0, 0],
    name: "Some room"
  }
};

export const reducer = (state, action) => {
  switch (action.type) {
    case "MOVE_PLAYER":
      return {
        ...state,
        player: {
          ...state.player,
          coordinates: updatePosition(
            state.room.board,
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
          board: action.gameBoard,
          isGameOver: false
        },
        player: {
          ...state.player,
          coordinates: action.startingPosition
        },
        room: {
          ...state.room,
          ...action.gameBoard[action.startingRoom[0]][action.startingRoom[1]]
        }
      };
  }
};
