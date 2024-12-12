"use client"

import React, { useState } from 'react';

//hooks
import useUserAuth from "../../hooks/userAuth.js"

//components
// import CreateUser from "./components/signup.js"

// mui
import { FormControl, Input, InputLabel, FormHelperText, Button, IconButton, InputAdornment } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

export default function SignUpForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [response, setResponse] = useState("")
  
    // Destructure functions correctly from userAuth
  const { login } = useUserAuth();
  // const [emailError, setEmailError] = useState('');
  // const [passwordError, setPasswordError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    const userData = {email, password}
    // setResponse(await CreateUser(userData, signup))
    const res = await login(email, password)
    setResponse(res.message)
  };

  const handleClickShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <form onSubmit={handleSubmit}>
      <FormControl required sx={{ marginBottom: 2 }}>
        <InputLabel htmlFor="email">Email</InputLabel>
        <Input
          id="email"
          name="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          aria-describedby="email-helper-text"
        />
      </FormControl>

      <FormControl required sx={{ marginBottom: 2 }}>
        <InputLabel htmlFor="password">Password</InputLabel>
        <Input
          id="password"
          name="password"
          type={showPassword ? 'text' : 'password'}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          aria-describedby="password-helper-text"
          endAdornment={
            <InputAdornment position="end">
              <IconButton onClick={handleClickShowPassword} edge="end">
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
        />
      </FormControl>
      <Button type="submit" variant="contained" color="primary" sx={{ marginTop: 2 }}>
        Submit
      </Button>
      {response && <h6>{response}</h6>}
    </form>
  );
}