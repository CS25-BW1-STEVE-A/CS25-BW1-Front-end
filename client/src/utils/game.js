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
const oldBoard = [
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

export let board = oldBoard.map((row, rowIdx) => {
  return oldBoard[rowIdx].map((room, roomIdx) => {
    let newRoom = { ...room };
    newRoom.board = createRoom(newRoom.isChicken, newRoom.exits);
    newRoom.coordinates = [rowIdx, roomIdx];
    return newRoom;
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
