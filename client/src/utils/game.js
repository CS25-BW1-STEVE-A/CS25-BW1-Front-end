import { createRoom } from "./room";
import axios from "axios";

export function addRoomsToBoard(board) {
  board.forEach((row, rowIdx) => {
    board[rowIdx].forEach((room, colIdx) => {
      let newRoom = { ...room };

      //new room board and new exits containing coordinates for those exits as well
      console.log("newRoom", newRoom);
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
