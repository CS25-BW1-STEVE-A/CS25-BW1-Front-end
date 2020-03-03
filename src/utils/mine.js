const axios = require("axios");
const { devinToken, sethToken, nazifaToken } = require("./tokens.js");

function mine(authToken) {
  //initialize
  axios({
    method: "get",
    url: "https://lambda-treasure-hunt.herokuapp.com/api/bc/mine/",
    headers: {
      Authorization: `Token ${authToken}`
    },
    data: {
        proof: 
    }
  })
    .then(res => {
      console.log(res.data);
    })
    .catch(err => console.log(err.Error));
}

if (process.argv[2] === "devin") {
  getLastProof(devinToken);
}

if (process.argv[2] === "seth") {
  getLastProof(sethToken);
}

if (process.argv[2] === "nazifa") {
  getLastProof(nazifaToken);
}
