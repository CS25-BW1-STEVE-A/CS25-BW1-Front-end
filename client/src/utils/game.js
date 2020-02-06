import { createRoom } from "./room";
import axios from "axios";

export function addRoomsToBoard(board) {
  console.log("addroomstoboard", board);
  board.forEach((row, rowIdx) => {
    board[rowIdx].forEach((room, colIdx) => {
      let newRoom = { ...room };

      //new room board and new exits containing coordinates for those exits as well
      newRoom.coordinates = [rowIdx, colIdx];

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
      console.log("newroom", newRoom);

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
