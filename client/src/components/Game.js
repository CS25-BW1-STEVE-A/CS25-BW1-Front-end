import React, { useState } from "react";
import axios from "axios";
import Room from "./Room";
import useEventListener from "../hooks/useEventListener";
import { reducer, initialState, KEY_CODES } from "../reducers/index";
import { axiosWithAuth, baseURL } from "../utils/index";
import MiniMap from "../components/MiniMap";

//Board we're anticipating from BE
// const board = [
//   ["Garden", "", ""],
//   ["Dungeon", "", ""],
//   ["Crap", "Book", "Eagle"]
// ];

//now we'll put objects in there
const board = [
  [
    {
      name: "The Garden",
      description: "A beautiful garden",
      exits: ["south"],
      players: []
    },
    {
      name: "The Kitchen",
      description: "A dank kitchen",
      exits: ["south"],
      players: []
    }
  ],
  [
    {
      name: "The Dungeon",
      description: "A beautiful Dungeon",
      exits: ["north", "east"],
      players: []
    },
    {
      name: "The Pillar Room",
      description: "A beautiful room",
      exits: ["west", "north"],
      players: []
    }
  ]
];

export default function() {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  const handleClick = () => {
    // stuff here
    axiosWithAuth()
      .get(`${baseURL}/api/adv/init`)
      .then(res => {
        console.log("axios with auth", res);
        //start game
        dispatch({
          type: "GAME_START",
          //starting position is for the room
          startingPosition: [1, 1],
          gameBoard: board,
          //starting room is which room on the board we're going to start in
          startingRoom: board[0][0]
        });
      })
      .catch(err => console.log("axios with auth", err));
  };

  const moveCharacter = e => {
    console.log(state.game);
    if (KEY_CODES[e.key] && state.game.isGameStart) {
      //make sure coordinates would work
      dispatch({
        type: "MOVE_PLAYER",
        direction: KEY_CODES[e.key]
      });
    }
  };

  useEventListener("keydown", moveCharacter);
  console.log(state.game);
  return (
    <div>
      <h1>This is the best game</h1>
      <button
        disabled={
          !state.game.isGameStart || state.game.isGameOver ? false : true
        }
        onClick={handleClick}
      >
        Start Game
      </button>
      <Room state={state} />
      {state.game.isGameStart && (
        <MiniMap
          board={state.game.board}
          roomCoordinates={state.room.coordinates}
        />
      )}
    </div>
  );
}
