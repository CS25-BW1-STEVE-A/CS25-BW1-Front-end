import React from "react";
import { createBoard, baseURL, axiosWithAuth } from "../utils/index";
import axios from "axios";
export default function() {
  const [gameStarted, setGameStarted] = React.useState(false);
  const [board, setBoard] = React.useState(createBoard(10));

  const handleClick = () => {
    // stuff here
    axiosWithAuth()
      .get(`${baseURL}/api/adv/init`)
      .then(res => console.log("axios with auth", res))
      .catch(err => console.log("axios with auth", err));
  };
  return (
    <div>
      <h1>This is the best game</h1>
      <button onClick={handleClick}>Start Game</button>
    </div>
  );
}
