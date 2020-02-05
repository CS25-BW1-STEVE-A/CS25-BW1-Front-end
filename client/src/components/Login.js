import React from "react";
import { useForm } from "react-hook-form";
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

export default function Login() {
  const { register, handleSubmit, formState, errors } = useForm({
    mode: "onChange"
  });
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
