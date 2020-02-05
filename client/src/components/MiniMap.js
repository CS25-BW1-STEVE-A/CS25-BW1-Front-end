import React from "react";
import styled from "styled-components";
import MapCell from "./MapCell";

const Map = styled.div`
  max-width: 100%;
  border: 5px solid #999;
  border-bottom: 0;
`;

const MapRow = styled.div`
  display: flex;
`;

export default function MiniMap({ state }) {
  return (
    <Map>
      {state.game.board.map((row, rowIdx) => {
        return (
          <MapRow key={rowIdx}>
            {state.game.board[rowIdx].map((col, colIdx) => {
              return (
                <MapCell
                  roomCoordinates={[rowIdx, colIdx]}
                  col={col}
                  key={colIdx}
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
