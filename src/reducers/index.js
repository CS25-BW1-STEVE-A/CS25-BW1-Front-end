import { axiosWithAuth, baseURL } from "../utils/index";
import { createRoom, updateRoom, randomChicken } from "../utils/room";
import { updatePosition, getStartingCoordinates } from "../utils/player";

//maybe dont' need this?
export const initialState = {
  game: {
    board: [],
    isGameOver: false,
    isGameStart: false
  },
  player: {
    coordinates: [-Infinity, Infinity],
    direction: ""
  },
  //current room
  room: {
    board: [],
    coordinates: [0, 0],
    name: "Let's Begin",
    isChicken: false
  }
};

export const reducer = (state, action) => {
  switch (action.type) {
    case "MOVE_PLAYER":
      //update position here and if returned door, then update room
      let roomCoordinates = state.room.coordinates;
      //player coordinates
      let roomBoard = state.room.board;
      let playerCoordinates = updatePosition(
        state.room.board,
        action.direction,
        state.player.coordinates
      );
      let moveMessage = "";

      if (playerCoordinates === "Door") {
        //call update room
        let result = updateRoom(
          state.game.board,
          action.direction,
          roomCoordinates
        );
        playerCoordinates = result.playerCoordinates;
        roomCoordinates = result.roomCoordinates;
        roomBoard = result.roomBoard;

        let cardinalDirections = {
          UP: "north",
          DOWN: "south",
          LEFT: "west",
          RIGHT: "east"
        };
        let cardinalDirection = cardinalDirections[action.direction];
        axiosWithAuth()
          .post(`${baseURL}/adv/move`, {
            direction: cardinalDirections[action.direction].slice(0, 1)
          })
          .then(res => console.log("res from be??", res))
          .catch(err => console.log(err));

        moveMessage = `${state.player.name} has moved ${cardinalDirection}.`;

        randomChicken(roomBoard);
      }

      let isGameOver = false;
      let isGameStart = true;
      let chickenPoints = 0;
      if (playerCoordinates === "Caught Chicken") {
        //caught chicken
        chickenPoints += 10;
        playerCoordinates = state.player.coordinates;
        //quick fix
        if (action.direction === "UP") playerCoordinates[0]--;
        if (action.direction === "DOWN") playerCoordinates[0]++;
        if (action.direction === "RIGHT") playerCoordinates[1]++;
        if (action.direction === "LEFT") playerCoordinates[1]--;
      }

      return {
        ...state,
        game: {
          ...state.game,
          isGameOver: isGameOver,
          isGameStart: isGameStart
        },
        player: {
          ...state.player,
          coordinates: playerCoordinates,
          moveMessage: moveMessage,
          score: (state.player.score += chickenPoints)
        },
        room: {
          ...state.room,
          ...state.game.board[roomCoordinates[0]][roomCoordinates[1]],
          coordinates: roomCoordinates,
          board: roomBoard
        }
      };

    case "GAME_START":
      let startPlayerCoordinates = getStartingCoordinates(
        action.startingRoom.board
      );

      return {
        game: {
          board: action.gameBoard,
          isGameStart: true,
          isGameOver: false
        },
        player: {
          coordinates: startPlayerCoordinates,
          direction: "",
          moveMessage: "",
          name: localStorage.getItem("username"),
          score: 0
        },
        room: {
          ...action.startingRoom
        }
      };
  }
};
