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

  //checking if user went into a door
  if (board[newPositionRow][newPositionCol] === "Door") {
    console.log("user went into a door!");
  } else if (checkCoordinates(board, newPosition)) {
    return newPosition;
  } else {
    return currentPosition;
  }
}

function createRoom(exits, size) {
  let board = [];
  //Adding a border of walls or doors
  size += 2;

  for (let i = 0; i < size; i++) {
    board.push([]);
    for (let j = 0; j < size; j++) {
      //Top, bottom, left, and right walls
      if (i === 0 || i === size - 1 || j === 0 || j === size - 1) {
        board[i].push("Wall");
      } else {
        board[i].push("");
      }
    }
  }

  // ["east", "west" , "north", "south"]
  if (exits.includes("north")) {
    let rowIdx = 0;
    //random number between 1 and 5 inclusively
    let colIdx = Math.floor(Math.random() * (size - 2) + 1);
    board[rowIdx][colIdx] = "Door";
  }

  if (exits.includes("south")) {
    let rowIdx = size - 1;
    //random number between 1 and 5 inclusively
    let colIdx = Math.floor(Math.random() * (size - 2) + 1);
    board[rowIdx][colIdx] = "Door";
  }

  if (exits.includes("west")) {
    let rowIdx = Math.floor(Math.random() * (size - 2) + 1);
    //random number between 1 and 5 inclusively
    let colIdx = 0;
    board[rowIdx][colIdx] = "Door";
  }

  if (exits.includes("east")) {
    let rowIdx = Math.floor(Math.random() * (size - 2) + 1);
    //random number between 1 and 5 inclusively
    let colIdx = size - 1;
    board[rowIdx][colIdx] = "Door";
  }

  return board;
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
          ...action.startingRoom,
          board: createRoom(action.startingRoom.exits, 5)
        }
      };
  }
};
