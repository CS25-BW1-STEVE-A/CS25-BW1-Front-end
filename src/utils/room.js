import { VECTORS } from "./player";
const uuidv1 = require("uuid/v1");

//Board to help us find next room
//direction to help us find next room
//roomCoordinates, so we know where we are
export function updateRoom(gameBoard, direction, roomCoordinates) {
  //Get the next room's coordinates
  let newPositionRow = roomCoordinates[0] + VECTORS[direction][0];
  let newPositionCol = roomCoordinates[1] + VECTORS[direction][1];
  roomCoordinates = [newPositionRow, newPositionCol];

  //need the next room
  let roomBoard = gameBoard[newPositionRow][newPositionCol].board;
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

  return { roomCoordinates, playerCoordinates, roomBoard };
}

export function createEmptyBoard(size) {
  let board = [];
  //making board empty ie all walls
  for (let i = 0; i < size; i++) {
    board.push([]);
    for (let j = 0; j < size; j++) {
      //Top, bottom, left, and right walls
      board[i].push("Wall");
    }
  }
  return board;
}

export function createEmptyRoom(size) {
  let board = createEmptyBoard(size);
  let room = { board: board, coordinates: [uuidv1(), uuidv1()], name: "EMPTY" };
  return room;
}

//room, roomBoard, doorEntrances (returning these)
function createDoorEntrances(room, roomBoard, gameBoard, size, fakePaths) {
  let doorEntrances = [];

  // exits: {north: [], south: [], etc}
  if (room.exits.north) {
    let doorCoordinates = [null, null];
    //get the north room and check if it's been visited
    let foundRoom = gameBoard[room.coordinates[0] - 1][room.coordinates[1]];
    if (foundRoom.visited) {
      //exits: [{"south": [0,1]}]
      //for north, we want the col value, index 1
      //we want to coordinate of the first spot below the door
      doorCoordinates[0] = 0;
      doorCoordinates[1] = foundRoom.exits.south[1];
    } else {
      doorCoordinates[0] = 0;
      doorCoordinates[1] = Math.floor(Math.random() * (size - 2) + 1);
    }

    //add door coordinates to this room's exits
    room.exits.north = doorCoordinates;

    //when we change the board, we want the actual cell of the door
    roomBoard[doorCoordinates[0]][doorCoordinates[1]] = "Door";
    //add 1 to row for entrance below north door
    doorEntrances.push([doorCoordinates[0] + 1, doorCoordinates[1]]);
  }

  if (room.exits.south) {
    let doorCoordinates = [null, null];
    //get the north room and check if it's been visited
    let foundRoom = gameBoard[room.coordinates[0] + 1][room.coordinates[1]];
    if (foundRoom.visited) {
      //exits: [{"north": [0,1]}]
      //for north, we want the col value, index 1
      //we want to coordinate of the first spot above the door
      doorCoordinates[0] = size - 1;
      doorCoordinates[1] = foundRoom.exits.north[1];
    } else {
      doorCoordinates[0] = size - 1;
      doorCoordinates[1] = Math.floor(Math.random() * (size - 2) + 1);
    }

    //add door coordinates to this room's exits
    room.exits.south = doorCoordinates;

    roomBoard[doorCoordinates[0]][doorCoordinates[1]] = "Door";
    //row - 1 to have the entrance be above the door
    doorEntrances.push([doorCoordinates[0] - 1, doorCoordinates[1]]);
  }

  if (room.exits.east) {
    let doorCoordinates = [null, null];
    //get the north room and check if it's been visited
    let foundRoom = gameBoard[room.coordinates[0]][room.coordinates[1] + 1];
    if (foundRoom.visited) {
      //exits: [{"west": [0,1]}]
      //for west, we want the col value, index 1
      //we want to coordinate of the first spot left of the door
      doorCoordinates[0] = foundRoom.exits.west[0];
      doorCoordinates[1] = size - 1;
    } else {
      doorCoordinates[0] = Math.floor(Math.random() * (size - 2) + 1);
      doorCoordinates[1] = size - 1;
    }

    //add door coordinates to this room's exits
    room.exits.east = doorCoordinates;

    roomBoard[doorCoordinates[0]][doorCoordinates[1]] = "Door";
    //the entrance will be to the left, so col - 1
    doorEntrances.push([doorCoordinates[0], doorCoordinates[1] - 1]);
  }

  if (room.exits.west) {
    let doorCoordinates = [null, null];
    //get the north room and check if it's been visited
    let foundRoom = gameBoard[room.coordinates[0]][room.coordinates[1] - 1];
    if (foundRoom.visited) {
      //exits: [{"east": [0,1]}]
      //for east, we want the col value, index 1
      //we want to coordinate of the first spot right of the door
      doorCoordinates[0] = foundRoom.exits.east[0];
      doorCoordinates[1] = 0;
    } else {
      doorCoordinates[0] = Math.floor(Math.random() * (size - 2) + 1);
      doorCoordinates[1] = 0;
    }

    //add door coordinates to this room's exits
    room.exits.west = doorCoordinates;

    roomBoard[doorCoordinates[0]][doorCoordinates[1]] = "Door";
    //an entrance should be in the col + 1
    doorEntrances.push([doorCoordinates[0], doorCoordinates[1] + 1]);
  }

  //We are adding/subtacting 1 on doors in door array to make starting cell directing in fron to the door

  //always add two random fake doors, so there is more space
  while (fakePaths > 0) {
    //random between 1 and size - 1 for both indices
    let randomRow = Math.floor(Math.random() * (size - 2)) + 1;
    let randomCol = Math.floor(Math.random() * (size - 2)) + 1;

    doorEntrances.push([randomRow, randomCol]);
    fakePaths--;
  }

  return doorEntrances;
}

export function createRoom(gameBoard, room, size = 10, fakePaths = 7) {
  //Make board full of walls
  let roomBoard = createEmptyBoard(size);

  let doorEntrances = createDoorEntrances(
    room,
    roomBoard,
    gameBoard,
    size,
    fakePaths
  );

  //case of 1 door, 3, and 4 doors
  while (doorEntrances.length > 0) {
    let startCell = doorEntrances.shift();
    let endCell = doorEntrances.shift();
    //row (up/down), col (left,right)
    let direction = [0, 0];

    //add in directions we need to
    direction[0] = endCell[0] - startCell[0];
    direction[1] = endCell[1] - startCell[1];

    //make starting and end cell empty
    roomBoard[startCell[0]][startCell[1]] = "";
    roomBoard[endCell[0]][endCell[1]] = "";
    //while directions are not 0's
    let curCell = startCell;

    while (direction[0] !== 0 || direction[1] !== 0) {
      //do the first direction first
      if (direction[0] > 0) {
        curCell[0]++;
        direction[0]--;
      } else if (direction[0] < 0) {
        curCell[0]--;
        direction[0]++;
      } else if (direction[1] > 0) {
        curCell[1]++;
        direction[1]--;
      } else if (direction[1] < 0) {
        curCell[1]--;
        direction[1]++;
      }
      roomBoard[curCell[0]][curCell[1]] = "    ";
    }

    //Case of more than 2 doors
    if (doorEntrances.length >= 1) {
      //unshift one of the two doors on there
      doorEntrances.unshift(endCell);
    }
  }

  room.board = roomBoard;

  return room;
}
