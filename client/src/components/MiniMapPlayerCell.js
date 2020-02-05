import React from "react";
import styled from "styled-components";

export const MiniMapCell = styled.div`
  height: 10px;
  width: 10px;
  background-color: ${({ col, checkForCurrentCell }) => {
    if (col === "Wall") {
      return "black";
    } else if (col === "Door") {
      return "brown";
    } else if (checkForCurrentCell) {
      return "red";
    } else {
      // it's "" or chicken
      return "white";
    }
  }};
`;

//check if player is in this cell using player.coordinates (are room coordinates) compared to rowIdx, colIdx
//check if room coordinates and room coordinates on state match
function checkForCurrentCell(
  playerCoordinates,
  cellCoordinates,
  roomCoordinates,
  currentRoomCoordinates
) {
  if (
    playerCoordinates[0] !== cellCoordinates[0] ||
    playerCoordinates[1] !== cellCoordinates[1]
  ) {
    return false;
  }

  if (
    roomCoordinates[0] !== currentRoomCoordinates[0] ||
    roomCoordinates[1] !== currentRoomCoordinates[1]
  ) {
    return false;
  }

  //player's cell matches current cell
  //room matches current room
  return true;
}
//room is room object where we can get coordinates
export default function MiniMapPlayerCell({
  col,
  colIdx,
  rowIdx,
  state,
  roomCoordinates
}) {
  if (
    checkForCurrentCell(
      state.player.coordinates,
      [rowIdx, colIdx],
      roomCoordinates,
      state.room.coordinates
    )
  ) {
    console.log("inside MiniMapPlayerCell");
  }
  return (
    <MiniMapCell
      col={col}
      checkForCurrentCell={checkForCurrentCell(
        state.player.coordinates,
        [rowIdx, colIdx],
        roomCoordinates,
        state.room.coordinates
      )}
    >
      {}
    </MiniMapCell>
  );
}
