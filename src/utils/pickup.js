const axios = require("axios");
const { devinToken, sethToken, nazifaToken } = require("./tokens.js");

function pickUp(authToken, itemName) {
  //initialize
  axios({
    method: "post",
    url: "https://lambda-treasure-hunt.herokuapp.com/api/adv/take/",
    headers: {
      Authorization: `Token ${authToken}`
    },
    data: {
      name: itemName
    }
  })
    .then(res => {
      console.log(res.data);
    })
    .catch(err => console.log(err.Error));
}

if (process.argv[2] === "devin") {
  let itemName = process.argv[3];
  let itemSecondName = process.argv[4];
  pickUp(devinToken, `${itemName} ${itemSecondName}`);
}

if (process.argv[2] === "seth") {
  let itemName = process.argv[3];
  let itemSecondName = process.argv[4];
  pickUp(sethToken, `${itemName} ${itemSecondName}`);
}

if (process.argv[2] === "nazifa") {
  let itemName = process.argv[3];
  let itemSecondName = process.argv[4];
  pickUp(nazifaToken, `${itemName} ${itemSecondName}`);
}
