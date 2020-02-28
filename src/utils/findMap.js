const axios = require("axios");

let map = {};

function reverseDirection(direction) {
  if (direction === "n") {
    return "s";
  } else if (direction === "s") {
    return "n";
  } else if (directon === "e") {
    return "w";
  } else if (direction === "w") {
    return "e";
  } else {
    return "Incorrect Direction yo!";
  }
}

//initialize
axios({
  method: "get",
  url: "https://lambda-treasure-hunt.herokuapp.com/api/adv/init/",
  data: {
    Authorization: "Token 7a375b52bdc410eebbc878ed3e58b2e94a8cb607"
  }
})
  .then(res => {
    console.log("Initializiation: ", res);
    map[res.room_id] = res;
    map[res.room_id].exits = map[res.room_id].exits.map(exit => {
      return { [exit]: "?" };
    });
  })
  .catch(err => console.log(err));
let timeOutAmount = 15000;

let visitedRooms = new Set();
let currentDirections = [];
let currentRoomNumber = 0;

//Waiting the desired amount before our next request
let intervalId = setInterval(() => {
  //Assuming it's 15 second for all requests

  //Clearing interval - thus ending
  if (visitedRooms.size === 500) {
    clearInterval(intervalId);
  }

  timeOutAmount = 15000;

  //add the current room to visted rooms
  visitedRooms.add(currentRoomNumber);

  let exits = map[currentRoomNumber].exits;

  //initializing next direction to use for axios
  let nextDirection;

  //if going north is unvisited
  let nextRoomObject = {};

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

    //we know the next room?
    nextRoomObject = {
      next_room_id: map[currentRoomNumber].exits[nextDirection]
    };

    //set time out amount to be half since we know the next room
    timeOutAmount = 7500;
  }

  //make the request
  axios({
    method: "post",
    url: "https://lambda-treasure-hunt.herokuapp.com/api/adv/move/",
    data: {
      Authorization: "Token 7a375b52bdc410eebbc878ed3e58b2e94a8cb607",
      direction: nextDirection,
      ...nextRoomObject
    }
  })
    .then(res => {
      console.log("Initializiation: ", res);
      let newRoomID = res.room_id;
      //initializing room in map
      map[newRoomID] = res;
      map[newRoomID].exits = map[newRoomID].exits.map(exit => {
        return { [exit]: "?" };
      });

      //add this new room to the old room's exits
      map[newRoomID].exits[reverseDirection(nextDirection)] = currentRoomNumber;

      //add the old room to the new room's exits
      map[currentRoomNumber].exits[nextDirection] = newRoomID;

      currentRoomNumber = newRoomID;
    })
    .catch(err => console.log(err));

  //console stuff in case of errors
  console.log(map);
  console.log(visitedRooms);
}, timeOutAmount);
