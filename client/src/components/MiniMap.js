import React from "react";
import styled from "styled-components";
import MapCell from "./MapCell";
import { createEmptyRoom } from "../utils/room";

const Map = styled.div`
  max-width: 100%;
  border: 5px solid #999;
  border-bottom: 0;
  background-color: black;
`;

const MapRow = styled.div`
  display: flex;
`;

export default function MiniMap({ state }) {
  //confine board to 3x3 with player's room cell in the middle, there may be some room that are just black because it's off the board
  //use room.coordinates
  //filter the board, so that rowIdx room.coordinates[0] - 1 to room.coordinates[0] + 1 and same for column
  let board = [...state.game.board];
  console.log("state.room.coordinates", state.room.coordinates);
  console.log("state.room.board.length", state.room.board.length);
  let boardWithCroppedRows = [];
  for (
    let i = state.room.coordinates[0] - 1;
    i < state.room.coordinates[0] + 2;
    i++
  ) {
    //if i < 0, add before, if i > board.length - 1, add to end, otherwise take the row from teh board
    if (i < 0) {
      let emptyArray = [];
      for (let i = 0; i < board[0].length; i++) {
        emptyArray.push(createEmptyRoom(state.room.board.length));
      }
      boardWithCroppedRows.push(emptyArray);
    } else if (i > board.length - 1) {
      let emptyArray = [];
      for (let i = 0; i < board[0].length; i++) {
        emptyArray.push(createEmptyRoom(state.room.board.length));
      }
      boardWithCroppedRows.push(emptyArray);
    } else {
      boardWithCroppedRows.push(board[i]);
    }
  }

  let boardWithCroppedCols = [];
  for (let row of boardWithCroppedRows) {
    //for loop for columns that i want
    let tempRow = [...row];
    for (
      let i = state.room.coordinates[1] - 1;
      i < state.room.coordinates[1] + 2;
      i++
    ) {
      //if i < 0, add before given row at the colIdx and remove last, if i > length junk, add to last remove first
      if (i < 0) {
        console.log("negative i", tempRow);
        //Adding an empty room to the beginning of the row
        tempRow.unshift(createEmptyRoom(state.room.board.length));
        //remove the last value from the row
        tempRow.pop();
        console.log("negative i", tempRow);
      } else if (i > tempRow.length - 1) {
        //add an empty room to the end of the row
        tempRow.push(createEmptyRoom(state.room.board.length));
        //remove the beginning value from the row
        tempRow.shift();
      }
    }
    boardWithCroppedCols.push(tempRow);
  }

  board = boardWithCroppedCols;

  console.log("please be right-------------", board);

  return (
    <Map>
      {board.map((row, rowIdx) => {
        return (
          <MapRow key={rowIdx}>
            {board[rowIdx].map((col, colIdx) => {
              //empty rooms don't have coordinates, does that matter inside
              return (
                <MapCell
                  roomCoordinates={[col.coordinates[0], col.coordinates[1]]}
                  col={col}
                  key={col.coordinates[1]}
                  state={state}
                />
              );
            })}
          </MapRow>
        );
      })}
    </Map>
  );
}
