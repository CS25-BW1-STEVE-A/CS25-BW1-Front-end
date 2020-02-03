import React, { useState } from "react";
import axios from "axios";
import Room from "./Room";
import useEventListener from "../hooks/useEventListener";
import { reducer, initialState, KEY_CODES } from "../reducers/index";
import { axiosWithAuth, baseURL } from "../utils/index";

//Board we're anticipating from BE
// const board = [
//   ["R", "", ""],
//   ["R", "", ""],
//   ["R", "R", "R"]
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
    "",
    ""
  ],
  [
    {
      name: "The Dungeon",
      description: "A dank dungeon",
      exits: ["south"],
      players: []
    },
    "",
    ""
  ],
  [
    {
      name: "The Garden",
      description: "A beautiful garden",
      exits: ["north", "east"],
      players: []
    },
    {
      name: "The Book",
      description: "A beautiful book",
      exits: ["west", "east"],
      players: []
    },
    {
      name: "The Eagle",
      description: "A eagle appears",
      exits: ["west"],
      players: []
    }
  ]
];

export default function() {
  const [gameStarted, setGameStarted] = useState(false);

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
    if (KEY_CODES[e.key]) {
      //make sure coordinates would work
      dispatch({
        type: "MOVE_PLAYER",
        direction: KEY_CODES[e.key]
      });
    }
  };

  useEventListener("keydown", moveCharacter);

  return (
    <div>
      <h1>This is the best game</h1>
      <button onClick={handleClick}>Start Game</button>
      <Room state={state} />
    </div>
  );
}
