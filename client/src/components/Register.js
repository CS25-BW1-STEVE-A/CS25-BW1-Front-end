import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { baseURL } from "../utils/index";

export default function Register() {
  const { register, handleSubmit, watch, errors } = useForm();
  const onSubmit = data => {
    //const username = data.username
    //const password = data.password

    //going to do test user etc
    const testUser = "testuser";
    const testPassword = "testpassword";
    axios
      .post(`${baseURL}/api/login/`, {
        username: testUser,
        password: testPassword
      })
      .then(res => {
        console.log(res);
        localStorage.setItem("token", res.data.key);
      })
      .catch(err => console.log(err));
  };

  console.log(watch("example")); // watch input value by passing the name of it

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input name="username" ref={register({ required: true })} />
      {errors.username && <span>This field is required</span>}

      <input name="password" ref={register({ required: true })} />
      {errors.username && <span>This field is required</span>}

      <input type="submit" />
    </form>
  );
}
