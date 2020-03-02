const axios = require("axios");
const { devinToken, sethToken, nazifaToken } = require("./tokens.js");

const sleep = (milliseconds = 500) =>
  new Promise(resolve => setTimeout(resolve, milliseconds));

function getStartingRoom(authToken) {
  let r;
  async function get(authToken) {
    let result = await axios({
      method: "get",
      url: "https://lambda-treasure-hunt.herokuapp.com/api/adv/init/",
      headers: {
        Authorization: `Token ${authToken}`
      }
    });
    await sleep(1000);
    r = result.data;
  }
  get(authToken);
  return r;
}

// function getStartingRoom(authToken) {
//   //initialize
//   let startingRoomNumber;
//   axios({
//     method: "get",
//     url: "https://lambda-treasure-hunt.herokuapp.com/api/adv/init/",
//     headers: {
//       Authorization: `Token ${authToken}`
//     }
//   })
//     .then(res => {
//       console.log(res.data);
//       startingRoomNumber = res.data.room_id;
//     })
//     .catch(err => console.log(err.Error));
// }

if (process.argv[2] === "devin") {
  getStartingRoom(devinToken);
}

if (process.argv[2] === "seth") {
  let startingRoom = getStartingRoom(sethToken);
  console.log(startingRoom, "HERHERHEHRHE");
}

if (process.argv[2] === "nazifa") {
  getStartingRoom(nazifaToken);
}
