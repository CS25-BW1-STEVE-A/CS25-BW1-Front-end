const axios = require("axios");
const { devinToken, sethToken, nazifaToken } = require("./tokens.js");

const sleep = (milliseconds = 1000) =>
  new Promise(resolve => setTimeout(resolve, milliseconds));

function get(authToken) {
  return axios({
    method: "get",
    url: "https://lambda-treasure-hunt.herokuapp.com/api/adv/init/",
    headers: {
      Authorization: `Token ${authToken}`
    }
  })
    .then(res => {
      console.log(res.data);
      return res.data;
    })
    .catch(err => {
      console.error(err);
    });
}
async function getStartingRoom(authToken) {
  const result = await get(authToken);
  return result;
}

if (process.argv[2] === "devin") {
  get(devinToken);
}

if (process.argv[2] === "seth") {
  let r = get(sethToken).then(result => {
    return result;
  });
}

if (process.argv[2] === "nazifa") {
  getStartingRoom(nazifaToken);
}
