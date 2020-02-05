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
  Warning
} from "./Styles";

export default function Register() {
  const { register, handleSubmit, formState, errors } = useForm({
    mode: "onChange"
  });
  const onSubmit = data => {
    const username = data.username;
    const password = data.password;

    //going to do test user etc
    // const testUser = "testuser";
    // const testPassword = "testpassword";
    axios
      .post(`${baseURL}/registration/`, {
        username: username,
        password1: password,
        password2: password
      })
      .then(res => {
        console.log("register res", res);
        localStorage.setItem("token", res.data.key);
      })
      .catch(err => console.log(err));
  };

  return (
    <Flex justifyContent="center">
      <Background>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <h2>Register</h2>
          <StyledInput
            placeholder="Username"
            name="username"
            ref={register({ required: true })}
          />
          {errors.username && <Warning>This field is required</Warning>}

          <StyledInput
            placeholder="Password"
            name="password"
            type="password"
            ref={register({ required: true, minLength: 8 })}
          />
          {errors.username && <Warning>This field is required</Warning>}

          <SubmitButton type="submit" disabled={!formState.isValid}>
            Register
          </SubmitButton>
        </Form>
      </Background>
    </Flex>
  );
}
