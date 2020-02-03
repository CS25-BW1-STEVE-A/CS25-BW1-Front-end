import axios from "axios";

export const baseURL = "https://lambda-mud-test.herokuapp.com";

export const createBoard = size => {
  let board = [];
  for (let i = 0; i < size; i++) {
    board.push([]);
    for (let j = 0; j < size; j++) {
      board[i].push("");
    }
  }
  return board;
};

//Makes axios call and send token if existing
export const axiosWithAuth = () => {
  const token = localStorage.getItem("token");

  console.log(token);
  return axios.create({
    baseURL: baseURL,
    headers: {
      Authorization: `Token ${token}`
    }
  });
};
