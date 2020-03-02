const axios = require("axios");

const authToken = "d71b66229716fe203b4b93fb703e2da285ab6f03";
const { map } = require("./map.js");

let timeOutAmount = 15000;

function reverseDirection(direction) {
  if (direction === "n") {
    return "s";
  } else if (direction === "s") {
    return "n";
  } else if (direction === "e") {
    return "w";
  } else if (direction === "w") {
    return "e";
  } else {
    return "Incorrect Direction yo!";
  }
}

let visitedRooms = new Set();
let currentDirections = [];
let nextDirection;
let nextRoomObject;

//initialize
axios({
  method: "get",
  url: "https://lambda-treasure-hunt.herokuapp.com/api/adv/init/",
  headers: {
    Authorization: `Token ${authToken}`
  }
})
  .then(res => {
    let newRoomID = res.data.room_id;
    //initializing room in map
    map[newRoomID] = { ...res.data };

    //["n", "s"] => {"n": "?"}
    map[newRoomID].exits = {};

    res.data.exits.forEach(exit => {
      map[newRoomID].exits[exit] = "?";
    });

    currentRoomNumber = newRoomID;

    timeOutAmount = 16 * 1000;

    //add the current room to visted rooms
    visitedRooms.add(currentRoomNumber);

    let exits = map[currentRoomNumber].exits;

    //if going north is unvisited
    nextRoomObject = {};

    if (exits["n"] && exits["n"] === "?") {
      currentDirections.push("n");
      nextDirection = "n";
    } else if (exits["s"] && exits["s"] === "?") {
      currentDirections.push("s");
      nextDirection = "s";
    } else if (exits["e"] && exits["e"] === "?") {
      currentDirections.push("e");
      nextDirection = "e";
    } else if (exits["w"] && exits["w"] === "?") {
      currentDirections.push("w");
      nextDirection = "w";
    } else {
      let lastDirection = currentDirections.pop();
      nextDirection = reverseDirection(lastDirection);
    }
  })
  .catch(err => console.log(err.Error));

//Waiting the desired amount before our next request
let intervalId = setInterval(() => {
  //make the request
  axios({
    method: "post",
    url: "https://lambda-treasure-hunt.herokuapp.com/api/adv/move/",
    headers: {
      Authorization: `Token ${authToken}`
    },
    data: {
      direction: nextDirection,
      ...nextRoomObject
    }
  })
    .then(res => {
      console.log("next room: ", res.data);
      let newRoomID = res.data.room_id;

      if (!map[newRoomID]) {
        //initializing room in map
        map[newRoomID] = { ...res.data };

        //["n", "s"] => {"n": "?"}
        map[newRoomID].exits = {};
        console.log(res.data.exits, "before for each");
        res.data.exits.forEach(exit => {
          map[newRoomID].exits[exit] = "?";
        });

        //add this new room to the old room's exits
        map[newRoomID].exits[
          reverseDirection(nextDirection)
        ] = currentRoomNumber;

        //add the old room to the new room's exits
        map[currentRoomNumber].exits[nextDirection] = newRoomID;
      }

      //console stuff in case of errors
      console.log(map);
      console.log(visitedRooms);
      console.log(visitedRooms.size);
      console.log(
        `${currentRoomNumber} going ${nextDirection} to ${newRoomID}`
      );
      console.log("currentDirections", currentDirections);

      currentRoomNumber = newRoomID;

      //Assuming it's 15 second for all requests

      //Clearing interval - thus ending
      if (visitedRooms.size === 500) {
        clearInterval(intervalId);
      }

      //add the current room to visted rooms
      visitedRooms.add(currentRoomNumber);

      let exits = map[currentRoomNumber].exits;

      //if going north is unvisited
      nextRoomObject = {};

      if (exits["n"] && exits["n"] === "?") {
        currentDirections.push("n");
        nextDirection = "n";
      } else if (exits["s"] && exits["s"] === "?") {
        currentDirections.push("s");
        nextDirection = "s";
      } else if (exits["e"] && exits["e"] === "?") {
        currentDirections.push("e");
        nextDirection = "e";
      } else if (exits["w"] && exits["w"] === "?") {
        currentDirections.push("w");
        nextDirection = "w";
      } else {
        let lastDirection = currentDirections.pop();
        nextDirection = reverseDirection(lastDirection);
      }
    })
    .catch(err => console.log(err.Error));
}, timeOutAmount);
