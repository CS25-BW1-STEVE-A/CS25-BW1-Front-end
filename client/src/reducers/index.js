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
    return "Door";
  } else if (checkCoordinates(board, newPosition)) {
    return newPosition;
  } else {
    return currentPosition;
  }
}
//Board to help us find next room
//direction to help us find next room
//roomCoordinates, so we know where we are
function updateRoom(gameBoard, direction, roomCoordinates) {
  //Get the next room's coordinates
  let newPositionRow = roomCoordinates[0] + VECTORS[direction][0];
  let newPositionCol = roomCoordinates[1] + VECTORS[direction][1];
  roomCoordinates = [newPositionRow, newPositionCol];

  console.log(direction);
  console.log(
    "Object in game board of current room",
    gameBoard[newPositionRow][newPositionCol]
  );
  //need a new room
  let roomBoard = createRoom(
    gameBoard[newPositionRow][newPositionCol].exits,
    5
  );
  let playerCoordinates;

  //make new player coordinates be next to door of new room
  if (direction == "DOWN") {
    //we're at the top, so row = 1, we need to find col that contains door
    //row = 0 is the border with doors
    for (let col = 1; col < roomBoard[0].length - 1; col++) {
      if (roomBoard[0][col] === "Door") {
        playerCoordinates = [1, col];
      }
    }
  }

  if (direction == "UP") {
    //we're at the bottom, so row = roomBoard.length - 2 for the player, we need to find col that contains door
    //row = roomBoard.length - 1 is the border with doors
    for (let col = 1; col < roomBoard[0].length - 1; col++) {
      if (roomBoard[roomBoard.length - 1][col] === "Door") {
        playerCoordinates = [roomBoard.length - 2, col];
      }
    }
  }

  if (direction == "RIGHT") {
    //we're at the right, so col = roomBoard[0].length - 2 for the player, we need to find col that contains door
    //col = roomBoard.length - 1 is the border with doors
    for (let row = 1; row < roomBoard.length - 1; row++) {
      if (roomBoard[row][0] === "Door") {
        playerCoordinates = [row, 1];
      }
    }
  }

  if (direction == "LEFT") {
    //we're at the left, so col = roomBoard[0].length - 2 for the player, we need to find col that contains door
    //col = roomBoard.length - 1 is the border with doors
    for (let row = 1; row < roomBoard.length - 1; row++) {
      if (roomBoard[row][roomBoard.length - 1] === "Door") {
        playerCoordinates = [row, roomBoard.length - 2];
      }
    }
  }

  console.log(
    "the player coordinates being returned from update room are",
    playerCoordinates
  );
  return { roomCoordinates, playerCoordinates, roomBoard };
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
    isGameOver: false,
    isGameStart: false
  },
  player: {
    coordinates: [-Infinity, Infinity],
    direction: ""
  },
  //current room
  room: {
    board: createBoard(5),
    coordinates: [0, 0],
    name: "Some room"
  }
};

export const reducer = (state, action) => {
  switch (action.type) {
    case "MOVE_PLAYER":
      //update position here and if returned door, then update room
      let roomCoordinates = state.room.coordinates;
      //player coordinates
      let roomBoard = state.room.board;
      let playerCoordinates = updatePosition(
        state.room.board,
        action.direction,
        state.player.coordinates
      );

      if (playerCoordinates === "Door") {
        //call update room
        let result = updateRoom(
          state.game.board,
          action.direction,
          roomCoordinates
        );
        playerCoordinates = result.playerCoordinates;
        roomCoordinates = result.roomCoordinates;
        roomBoard = result.roomBoard;
      }

      return {
        ...state,
        player: {
          ...state.player,
          coordinates: playerCoordinates
        },
        room: {
          ...state.room,
          name: state.game.board[roomCoordinates[0]][roomCoordinates[1]].name,
          coordinates: roomCoordinates,
          board: roomBoard
        }
      };
    case "GAME_START":
      console.log(action);
      return {
        ...state,
        game: {
          ...state.game,
          board: action.gameBoard,
          isGameStart: true
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
