import React from "react";
import styled from "styled-components";
import MapCell from "./MapCell";

const Map = styled.div`
  border: 1px solid green;
  max-width: 500px;
  width: 500px;
  margin: 20px auto;
`;

const MapRow = styled.div`
  display: flex;
`;

function checkForCurrentRoom(
  playerRoomRow,
  playerRoomCol,
  currentRoomRow,
  currentRoomCol
) {
  return playerRoomRow === currentRoomRow && playerRoomCol === currentRoomCol;
}

export default function MiniMap({ board, roomCoordinates }) {
  return (
    <Map>
      {board.map((row, rowIdx) => {
        return (
          <MapRow key={rowIdx}>
            {board[rowIdx].map((col, colIdx) => {
              return (
                <MapCell
                  col={col}
                  isCurrentRoom={checkForCurrentRoom(
                    roomCoordinates[0],
                    roomCoordinates[1],
                    rowIdx,
                    colIdx
                  )}
                />
              );
            })}
          </MapRow>
        );
      })}
    </Map>
  );
}
