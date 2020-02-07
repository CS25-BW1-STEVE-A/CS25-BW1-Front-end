import React, { useState } from "react";
import axios from "axios";
import Room from "./Room";
import useEventListener from "../hooks/useEventListener";
import { reducer, initialState } from "../reducers/index";
import { axiosWithAuth, baseURL } from "../utils/index";
import { addRoomsToBoard, randomChicken } from "../utils/game";
import MiniMap from "../components/MiniMap";
import styled, { css } from "styled-components";
import { KEY_CODES } from "../utils/player";

const Flex = styled.div`
  display: flex;

  margin: ${({ margin }) => margin || "0px"};
  flex-wrap: ${({ flexWrap }) => flexWrap || "nowrap"};
  flex-direction: ${({ flexDirection }) => flexDirection || "row"};
  justify-content: ${({ justifyContent }) => justifyContent || "flex-start"};
  align-items: ${({ alignItems }) => alignItems || "flex-start"};
`;

const Console = styled.div`
  width: 100%;
  background: black;
  color: #00ff00;
  flex: 2;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  border: 5px solid #999;
`;

const Button = styled.button`
  border: 0;
  padding: 1em 2em;
  background-color: #4e4eb1;
  color: #fff;
  font-size: 16px;
  font-weight: 700;
  transition: 0.25s opacity cubic-bezier(0.98, 0.26, 0.52, 0.96);

  &:hover {
    cursor: pointer;
    opacity: 0.7;
  }

  display: ${({ disabled }) => (disabled ? "none" : "inline-block")};
`;

export default function() {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  const handleClick = () => {
    // stuff here
    let size = 3;
    axiosWithAuth()
      .get(`${baseURL}/adv/init`)
      .then(res => console.log(res))
      .catch(err => console.log(err));

    axiosWithAuth()
      // .get(`${baseURL}/adv/init`)
      // .get(`http://localhost:5000/maze/${size}`)
      .get(`${baseURL}/adv/rows`)
      .then(res => {
        let board = res.data.rooms;

        addRoomsToBoard(board);
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
      //move post
      dispatch({
        type: "MOVE_PLAYER",
        direction: KEY_CODES[e.key]
      });
    }
  };

  useEventListener("keydown", moveCharacter);

  return (
    <Flex margin="80px 0" justifyContent="center">
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
          <Flex flexDirection="row" alignItems="normal">
            <Room state={state} />
            <Flex justifyContent="space-between" flexDirection="column">
              <MiniMap state={state} />
              <Console>
                <p>Current Score: {state.player.score}</p>
                <p>
                  {state.player.name} has entered {state.room.name}
                </p>
                <p>{state.room.description}</p>
                <p>{state.player.moveMessage}</p>
              </Console>
            </Flex>
          </Flex>
        </>
      )}
    </Flex>
  );
}
