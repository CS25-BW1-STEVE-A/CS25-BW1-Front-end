import React from "react";
import styled from "styled-components";
import MapCell from "./MapCell";

const Map = styled.div`
  max-width: 150px;
  border: 1px solid green;
  margin: 20px auto;
`;

const MapRow = styled.div`
  display: flex;
`;

export default function MiniMap({ board }) {
  return (
    <Map>
      {board.map((row, rowIdx) => {
        return (
          <MapRow key={rowIdx}>
            {board[rowIdx].map((col, colIdx) => {
              return <MapCell room={col} />;
            })}
          </MapRow>
        );
      })}
    </Map>
  );
}
