import { createRoom } from "./room";
import axios from "axios";

export function addRoomsToBoard(board) {
  board.forEach((row, rowIdx) => {
    board[rowIdx].forEach((room, colIdx) => {
      let newRoom = { ...room };

      //new room board and new exits containing coordinates for those exits as well
      newRoom.coordinates = [rowIdx, colIdx];

      newRoom.visited = true;
      //giving the room visited is true - inside create room, if a next room hasn't been visited, we can give the current room a random door

      //current exits is like exits: ["north", "west"]
      //make exits like {exits: north: [], east: []}
      let tempExitObj = {};
      let tempRoomExits = [...room.exits];
      for (let exitDirection of tempRoomExits) {
        tempExitObj[exitDirection] = [];
      }
      newRoom.exits = tempExitObj;

      let createdRoom = createRoom(board, newRoom);
      newRoom.board = createdRoom.board;

      board[rowIdx][colIdx] = newRoom;
    });
  });
}

/* testing function to randomize chicken */
export function randomChicken(board) {
  let rows = board.length;
  let cols = board[0].length;

  let randomRow = Math.floor(Math.random() * rows);
  let randomCol = Math.floor(Math.random() * cols);

  board[randomRow][randomCol].isChicken = true;
}

function randomChoice(array) {
  return array[Math.floor(Math.random() * array.length)];
}

function shuffle(array) {
  var currentIndex = array.length,
    temporaryValue,
    randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
}

function getAdjacentRooms(board, rowIdx, colIdx) {
  let adjacentRooms = [];
  let vectors = [
    [0, 1],
    [0, -1],
    [1, 0],
    [-1, 0]
  ];
  for (let [r, c] of vectors) {
    if (
      rowIdx + r >= 0 &&
      rowIdx + r < board.length &&
      colIdx + c >= 0 &&
      colIdx + c < board.length
    ) {
      adjacentRooms.push(board[rowIdx + r][colIdx + c]);
    }
  }
  return adjacentRooms;
}

//rooms are objects {visited, coordinates}
//We're going to add exits: {north, south, east, west etc}
function addExits(room1, room2) {
  //north (row=0) south (row >)
  if (room1["coordinates"][0] > room2["coordinates"][0]) {
    room1["exits"].push("north");
    room2["exits"].push("south");
  }
  // south north
  if (room1["coordinates"][0] < room2["coordinates"][0]) {
    room1["exits"].push("south");
    room2["exits"].push("north");
  }
  // east west - col < secondCol
  if (room1["coordinates"][1] < room2["coordinates"][1]) {
    room1["exits"].push("east");
    room2["exits"].push("west");
  }
  // west east
  if (room1["coordinates"][1] > room2["coordinates"][1]) {
    room1["exits"].push("west");
    room2["exits"].push("east");
  }
}

function makeMazeObjects(size) {
  let maze = [];

  for (let i = 0; i < size; i++) {
    // Adding a row
    maze.push([]);
    for (let j = 0; j < size; j++) {
      // for each column add an object
      maze[i].push({
        players: [],
        coordinates: [i, j],
        visited: false,
        exits: []
      });
    }
  }
  return maze;
}

export function makeMaze(size) {
  let maze = makeMazeObjects(size);

  // Holding previous_room, current_room
  let stack = [[null, maze[0][0]]];
  while (stack.length > 0) {
    let [previousRoom, currentRoom] = stack.pop();

    if (currentRoom["visited"]) {
      // Then i want to make a door for previous and current room
      console.log(currentRoom);
      continue;
    } else {
      // If previous room is not None, make exits for both rooms
      if (previousRoom !== null) {
        addExits(previousRoom, currentRoom);
      }
      // Make currentRoom visited
      currentRoom["visited"] = true;
      // get list of adjacent rooms
      let adjacentRooms = getAdjacentRooms(
        maze,
        currentRoom["coordinates"][0],
        currentRoom["coordinates"][1]
      );

      // randomize adjacent rooms and add to stack if they haven't been visited
      shuffle(adjacentRooms);
      for (let adjacentRoom of adjacentRooms) {
        if (adjacentRoom["visited"] === false) {
          // previousRoom => currentRoom
          // currentRoom => adj
          stack.push([currentRoom, adjacentRoom]);
        }
      }
    }
  }

  //remove visited property
  for (let i = 0; i < maze.length; i++) {
    for (let j = 0; j < maze[i].length; j++) {
      let { visited, ...rest } = maze[i][j];
      maze[i][j] = rest;
    }
  }

  return maze;
}
