import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { baseURL } from "../utils/index";
import styled, { css } from "styled-components";

const LoginStyled = styled.form`
  width: 25%;
  margin: 15% auto;
  display: flex;
  flex-flow: column wrap;
  align-items: center;
`;

const SubmitButton = styled.input`
  margin: 30px 150px;
  color: blue;
  box-shadow: none;
  border: 1px solid blue;
  border-radius: 10px;
  padding: 10px 10px;

  ${props =>
    !props.disabled &&
    css`
      background-color: blue;
      color: white;
      border: 1px solid white;
    `}
`;

const StyledInput = styled.input`
  width: 50%;
  margin: 10px 0;
  font-family: "Play", sans-serif;
`;
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

  console.log(errors);
  return (
    <LoginStyled onSubmit={handleSubmit(onSubmit)}>
      <h2>Login</h2>
      <StyledInput
        name="username"
        placeholder="Username"
        ref={register({ required: true })}
      />
      {errors.username && <span>This field is required</span>}

      <StyledInput
        name="password"
        placeholder="Password"
        ref={register({ required: true })}
      />
      {errors.username && <span>This field is required</span>}

      <SubmitButton type="submit" disabled={!formState.isValid} />
    </LoginStyled>
  );
}
