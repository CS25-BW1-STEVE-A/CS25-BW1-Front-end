import React from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { baseURL } from "../utils/index";
import {
  Flex,
  Background,
  Form,
  SubmitButton,
  StyledInput,
  Warning,
  StyledLink,
  Text
} from "./Styles";
import Cookies from "js-cookie";

export default function Login() {
  const { register, handleSubmit, formState, errors } = useForm({
    mode: "onChange"
  });

  let history = useHistory();

  const onSubmit = data => {
    const username = data.username;
    const password = data.password;

    //going to do test user etc
    // const testUser = "testuser";
    // const testPassword = "testpassword";
    axios(`${baseURL}/login/`, {
      method: "post",
      data: {
        username: username,
        password: password
      },
      withCredentials: true
    })
      .then(res => {
        console.log(res);
        // console.log(Cookies.get("csrftoken"));
        // Cookies.set("X-CSRFToken", Cookies.get("csrftoken"));
        localStorage.setItem("token", res.data.key);
        localStorage.setItem("username", username);
        history.push("/game");
      })
      .catch(err => console.log(err));
  };

  return (
    <Flex justifyContent="center">
      <Background>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <h2>Login</h2>
          <StyledInput
            name="username"
            placeholder="Username"
            ref={register({ required: true })}
          />
          {errors.username && <Warning>This field is required</Warning>}

          <StyledInput
            name="password"
            placeholder="Password"
            type="password"
            ref={register({ required: true })}
          />
          {errors.username && <Warning>This field is required</Warning>}

          <SubmitButton type="submit" disabled={!formState.isValid}>
            Login
          </SubmitButton>
          <Text fontSize="0.7em">
            Not registered?{" "}
            <StyledLink to="/register">Create an account</StyledLink>
          </Text>
        </Form>
      </Background>
    </Flex>
  );
}
