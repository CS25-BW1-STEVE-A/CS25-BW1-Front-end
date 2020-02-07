import { axiosWithAuth, baseURL } from "../utils/index";
import { createRoom, updateRoom } from "../utils/room";
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

        //Random chance for chicken to be in that room 1 in 100
        let randomNumber = Math.floor(Math.random() * 100);
        let firstBreak;
        if (randomNumber === 17) {
          //loop through roomCoordinates, make the first "" cell we find into "Chicken"
          for (let i = 0; i < roomBoard.length; i++) {
            for (let j = 0; j < roomBoard[i].length; j++) {
              if (roomBoard[i][j] === "") {
                firstBreak = true;
                roomBoard[i][j] = "🐓";
                break;
              }
            }
            if (firstBreak) break;
          }
        }

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

        moveMessage = `You have moved ${cardinalDirection}`;
      }

      let isGameOver = false;
      let isGameStart = true;

      if (playerCoordinates === "Game Won") {
        isGameOver = true;
        isGameStart = false;
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
          moveMessage: moveMessage
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
          moveMessage: ""
        },
        room: {
          ...action.startingRoom
        }
      };
  }
};
