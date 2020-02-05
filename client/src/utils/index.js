import axios from "axios";

export const baseURL = "https://lambda-mud-test.herokuapp.com";

//Makes axios call and send token if existing
export const axiosWithAuth = () => {
  const token = localStorage.getItem("token");

  return axios.create({
    baseURL: baseURL,
    headers: {
      Authorization: `Token ${token}`
    }
  });
};
