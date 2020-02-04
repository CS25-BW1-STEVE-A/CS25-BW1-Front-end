import axios from "axios";

export const baseURL = "https://lambda-mud-test.herokuapp.com";

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

//Makes axios call and send token if existing
export const axiosWithAuth = () => {
  const token = localStorage.getItem("token");

  console.log(token);
  return axios.create({
    baseURL: baseURL,
    headers: {
      Authorization: `Token ${token}`
    }
  });
};

export const checkCoordinates = (board, newPosition) => {
  //outside bounds of game and not on someone
  let [row, col] = newPosition;
  //borders are doors and walls now
  return board[row][col] === "";
};

//now we'll put objects in there
export const board = [
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

/* testing function to randomize chicken */
export function randomChicken(board) {
  let rows = board.length;
  let cols = board[0].length;

  let randomRow = Math.floor(Math.random() * rows);
  let randomCol = Math.floor(Math.random() * cols);
  board[randomRow][randomCol].isChicken = true;
}
