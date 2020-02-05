import React, { useState } from "react";
import axios from "axios";
import Room from "./Room";
import useEventListener from "../hooks/useEventListener";
import { reducer, initialState } from "../reducers/index";
import { axiosWithAuth, baseURL } from "../utils/index";
import { board, randomChicken } from "../utils/game";
import MiniMap from "../components/MiniMap";
import styled, { css } from "styled-components";
import { KEY_CODES } from "../utils/player";

const Flex = styled.div`
  display: flex;
  margin: ${({ margin }) => margin || "0px"};
  flex-direction: ${({ flexDirection }) => flexDirection || "row"};
  justify-content: ${({ justifyContent }) => justifyContent || "flex-start"};
  align-items: ${({ alignItems }) => alignItems || "flex-start"};
`;

const Console = styled.div`
  border: 1px solid black;
  width: 100%;
  height: 25%;
  padding: 5px;
  overflow-y: scroll;
  background: black;
  color: #00ff00;
`;

const Button = styled.button`
  border: 2px solid #888481;
  padding: 1em 2em;
  font-weight: 700;

  &:hover {
    cursor: pointer;
  }

  display: ${({ disabled }) => (disabled ? "none" : "inline-block")};
`;

export default function() {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  const handleClick = () => {
    //Change chicken position
    console.log(board, "inside handle click");
    randomChicken(board);

    // stuff here
    axiosWithAuth()
      .get(`${baseURL}/api/adv/init`)
      .then(res => {
        console.log("axios with auth", res);
        //start game
        dispatch({
          type: "GAME_START",
          //starting position is for the room
          gameBoard: board,
          //starting room is which room on the board we're going to start in, which has board, coordinates etc
          startingRoom: board[0][0]
        });
      })
      .catch(err => console.log("axios with auth", err));
  };

  const moveCharacter = e => {
    if (KEY_CODES[e.key] && state.game.isGameStart) {
      e.preventDefault();
      //make sure coordinates would work
      dispatch({
        type: "MOVE_PLAYER",
        direction: KEY_CODES[e.key]
      });
    }
  };

  console.log("state", state);

  useEventListener("keydown", moveCharacter);

  return (
    <Flex margin="20px 0" justifyContent="center">
      <Flex justifyContent="center" flexDirection="column">
        {state.game.isGameOver && <h1>You caught the chicken</h1>}
        <Button
          disabled={
            !state.game.isGameStart || state.game.isGameOver ? false : true
          }
          onClick={handleClick}
        >
          Start Game
        </Button>
      </Flex>
      {state.game.isGameStart && (
        <>
          <Flex flexDirection="column">
            <Flex flexDirection="row">
              <Room state={state} />
              <MiniMap
                board={state.game.board}
                roomCoordinates={state.room.coordinates}
              />
            </Flex>

            <Console>
              <p>You have entered {state.room.name}</p>
              <p>{state.room.description}</p>
            </Console>
          </Flex>
        </>
      )}
    </Flex>
  );
}
