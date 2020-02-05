import { createRoom } from "./room";

export const createBoard = size => {
  let board = [];
  for (let i = 0; i < size; i++) {
    board.push([]);
    for (let j = 0; j < size; j++) {
      board[i].push("");
    }
  }
  return board;
};

//now we'll put objects in there
export let board = [
  [
    {
      name: "The Garden",
      description: "A beautiful garden",
      exits: ["south"],
      players: [],
      isChicken: false
    },
    {
      name: "The Kitchen",
      description: "A dank kitchen",
      exits: ["east"],
      players: [],
      isChicken: false
    },
    {
      name: "The Kitchen",
      description: "A dank kitchen",
      exits: ["west", "south"],
      players: [],
      isChicken: false
    }
  ],
  [
    {
      name: "The Garden",
      description: "A beautiful garden",
      exits: ["north", "south"],
      players: [],
      isChicken: false
    },
    {
      name: "The Kitchen",
      description: "A dank kitchen",
      exits: ["south"],
      players: [],
      isChicken: false
    },
    {
      name: "The Kitchen",
      description: "A dank kitchen",
      exits: ["north", "south"],
      players: [],
      isChicken: false
    }
  ],
  [
    {
      name: "The Garden",
      description: "A beautiful garden",
      exits: ["north", "east"],
      players: [],
      isChicken: false
    },
    {
      name: "The Kitchen",
      description: "A dank kitchen",
      exits: ["west", "north", "east"],
      players: [],
      isChicken: false
    },
    {
      name: "The Kitchen",
      description: "A dank kitchen",
      exits: ["north", "west"],
      players: [],
      isChicken: false
    }
  ]
];

board.forEach((row, rowIdx) => {
  board[rowIdx].forEach((room, colIdx) => {
    let newRoom = { ...room };

    // let adjacentRooms = getAdjacentRooms(board, rowIdx, colIdx);

    //new room board and new exits containing coordinates for those exits as well
    newRoom.coordinates = [rowIdx, colIdx];
    newRoom.visited = true;
    //newRoom we need coordinates to find adj rooms
    //newRoom we need chicken

    //make exits like {exits: north: [], east: []}
    let tempExitObj = {};
    let tempRoomExits = [...room.exits];
    for (let exitDirection of tempRoomExits) {
      tempExitObj[exitDirection] = [];
    }
    newRoom.exits = tempExitObj;
    let createdRoom = createRoom(board, newRoom);
    newRoom.board = createdRoom.board;
    console.log("newroom", newRoom);

    board[rowIdx][colIdx] = newRoom;
  });
});

/* testing function to randomize chicken */
export function randomChicken(board) {
  let rows = board.length;
  let cols = board[0].length;

  let randomRow = Math.floor(Math.random() * rows);
  let randomCol = Math.floor(Math.random() * cols);

  board[randomRow][randomCol].isChicken = true;
}
