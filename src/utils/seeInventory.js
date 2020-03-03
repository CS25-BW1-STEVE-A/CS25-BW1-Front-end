const axios = require("axios");
const { devinToken, sethToken, nazifaToken } = require("./tokens.js");

function seeInventory(authToken) {
  //initialize
  axios({
    method: "post",
    url: "https://lambda-treasure-hunt.herokuapp.com/api/adv/status/",
    headers: {
      Authorization: `Token ${authToken}`
    }
  })
    .then(res => {
      console.log(res.data);
    })
    .catch(err => console.log(err));
}

if (process.argv[2] === "devin") {
  seeInventory(devinToken);
}

if (process.argv[2] === "seth") {
  seeInventory(sethToken);
}

if (process.argv[2] === "nazifa") {
  seeInventory(nazifaToken);
}
