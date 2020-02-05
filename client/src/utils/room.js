import { VECTORS } from "./player";

//Board to help us find next room
//direction to help us find next room
//roomCoordinates, so we know where we are
export function updateRoom(gameBoard, direction, roomCoordinates) {
  //Get the next room's coordinates
  let newPositionRow = roomCoordinates[0] + VECTORS[direction][0];
  let newPositionCol = roomCoordinates[1] + VECTORS[direction][1];
  roomCoordinates = [newPositionRow, newPositionCol];

  console.log(direction);
  console.log(
    "Object in game board of current room",
    gameBoard[newPositionRow][newPositionCol]
  );

  //need the next room
  let roomBoard = gameBoard[newPositionRow][newPositionCol].board;
  console.log(roomBoard, "inside of updateROOM");
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

export function createRoom(isChicken, exits, size = 10, fakePaths = 2) {
  let board = [];

  for (let i = 0; i < size; i++) {
    board.push([]);
    for (let j = 0; j < size; j++) {
      //Top, bottom, left, and right walls
      board[i].push("Wall");
    }
  }

  // ["east", "west" , "north", "south"]
  let doors = [];
  if (exits.includes("north")) {
    let rowIdx = 0;
    //random number between 1 and 5 inclusively
    let colIdx = Math.floor(Math.random() * (size - 2) + 1);
    board[rowIdx][colIdx] = "Door";
    doors.push([rowIdx + 1, colIdx]);
  }

  if (exits.includes("south")) {
    let rowIdx = size - 1;
    //random number between 1 and 5 inclusively
    let colIdx = Math.floor(Math.random() * (size - 2) + 1);
    board[rowIdx][colIdx] = "Door";
    doors.push([rowIdx - 1, colIdx]);
  }

  if (exits.includes("west")) {
    let rowIdx = Math.floor(Math.random() * (size - 2) + 1);
    //random number between 1 and 5 inclusively
    let colIdx = 0;
    board[rowIdx][colIdx] = "Door";
    doors.push([rowIdx, colIdx + 1]);
  }

  if (exits.includes("east")) {
    let rowIdx = Math.floor(Math.random() * (size - 2) + 1);
    //random number between 1 and 5 inclusively
    let colIdx = size - 1;
    board[rowIdx][colIdx] = "Door";
    doors.push([rowIdx, colIdx - 1]);
  }

  //We are adding/subtacting 1 on doors in door array to make starting cell directing in fron to the door

  //always add two random fake doors, so there is more space
  while (fakePaths > 0) {
    //random between 1 and size - 1 for both indices
    let randomRow = Math.floor(Math.random() * (size - 2)) + 1;
    let randomCol = Math.floor(Math.random() * (size - 2)) + 1;

    doors.push([randomRow, randomCol]);
    fakePaths--;
  }

  let chickenStarts = [];
  //case of 1 door, 3, and 4 doors
  while (doors.length > 0) {
    let startCell = doors.shift();
    let endCell = doors.shift();
    //row (up/down), col (left,right)
    let direction = [0, 0];

    //add in directions we need to
    direction[0] = endCell[0] - startCell[0];
    direction[1] = endCell[1] - startCell[1];

    //make starting and end cell empty
    board[startCell[0]][startCell[1]] = "";
    board[endCell[0]][endCell[1]] = "";
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
      chickenStarts.push(curCell);
      board[curCell[0]][curCell[1]] = "    ";
    }

    //Case of more than 2 doors
    if (doors.length >= 1) {
      //unshift one of the two doors on there
      doors.unshift(endCell);
    }
  }
  console.log(chickenStarts);
  //add chicken to middle of board
  if (isChicken) {
    let startingLocationIndex = Math.floor(
      Math.random() * chickenStarts.length
    );
    let startingLocation = chickenStarts[startingLocationIndex];

    board[startingLocation[0]][startingLocation[1]] = "🐓";
  }

  return board;
}
