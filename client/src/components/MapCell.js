import React from "react";
import MiniMapPlayerCell from "./MiniMapPlayerCell";
import styled, { css } from "styled-components";

const MiniMapRoom = styled.div`
  /*  */
  border: 1px solid pink;
`;

const Row = styled.div`
  display: flex;
`;

//styled components
//Board, Row
//actual components
//MiniMapPlayerCell

//col is an array of cells for the room
export default function MapCell({ col, state, roomCoordinates }) {
  const roomBoard = col.board;
  return (
    //Maybe highlight room with a color?
    <MiniMapRoom exits={col.exits}>
      {roomBoard.map((row, rowIdx) => {
        return (
          <Row key={rowIdx}>
            {roomBoard[rowIdx].map((col, colIdx) => {
              //Pass col to tell if it's a wall, door, nothing or person
              return (
                <MiniMapPlayerCell
                  key={colIdx}
                  colIdx={colIdx}
                  rowIdx={rowIdx}
                  col={col}
                  state={state}
                  roomCoordinates={roomCoordinates}
                />
              );
            })}
          </Row>
        );
      })}
    </MiniMapRoom>
  );
}
