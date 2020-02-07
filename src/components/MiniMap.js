import React from "react";
import styled from "styled-components";
import MapCell from "./MapCell";
import { createEmptyRoom } from "../utils/room";

const Map = styled.div`
  max-width: 100%;
  border: 5px solid #999;
  padding: 5px 10px;
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
  // console.log("state.room.coordinates", state.room.coordinates);
  // console.log("state.room.board.length", state.room.board.length);
  let boardWithCroppedRows = [];
  for (
    let i = state.room.coordinates[0] - 1;
    i < state.room.coordinates[0] + 2;
    i++
  ) {
    //if i < 0, add before, if i > board.length - 1, add to end, otherwise take the row from teh board
    if (i < 0) {
      let emptyArray = [];
      for (let i = 0; i < state.game.board.length; i++) {
        emptyArray.push(createEmptyRoom(state.room.board.length));
      }
      boardWithCroppedRows.push(emptyArray);
    } else if (i > board.length - 1) {
      let emptyArray = [];
      for (let i = 0; i < state.game.board.length; i++) {
        emptyArray.push(createEmptyRoom(state.room.board.length));
      }
      boardWithCroppedRows.push(emptyArray);
    } else {
      boardWithCroppedRows.push(board[i]);
    }
  }

  let boardWithCroppedCols = [];
  let tempRow;
  for (let r = 0; r < boardWithCroppedRows.length; r++) {
    tempRow = [];
    //loop from 1 left of room to one right of roomo
    for (
      let c = state.room.coordinates[1] - 1;
      c < state.room.coordinates[1] + 2;
      c++
    ) {
      if (c < 0) {
        //off teh board left
        tempRow.push(createEmptyRoom(state.room.board.length));
      } else if (c > state.game.board.length - 1) {
        //off the board right
        tempRow.push(createEmptyRoom(state.room.board.length));
      } else {
        //It's on the board already
        tempRow.push(boardWithCroppedRows[r][c]);
      }
    }
    boardWithCroppedCols.push(tempRow);
  }

  board = boardWithCroppedCols;

  // console.log("please be right-------------", board);

  return (
    <Map>
      {board.map((row, rowIdx) => {
        return (
          <MapRow key={rowIdx}>
            {board[rowIdx].map((col, colIdx) => {
              {
                /* console.log("roomCoordinates", col); */
              }
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
