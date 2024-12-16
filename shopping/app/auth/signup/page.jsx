"use client"

import React, { useState } from 'react';

// hooks
import useUserAuth from "@/app/hooks/userAuth.js"

// mui
import { FormControlLabel, Button, IconButton, InputAdornment, Box, Checkbox, Typography, TextField, Link } from '@mui/material';
import { Visibility, VisibilityOff, NavigateBefore } from '@mui/icons-material';

export default function SignUp() {
  const [email, setEmail] = useState('');
  const [displayName, setDisplayName] = useState("");
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [response, setResponse] = useState("");
  const [checked, setChecked] = useState(false);

  // Destructure functions correctly from userAuth
  const { signup } = useUserAuth();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const userData = { email, password, displayName };
    const res = await signup(email, password);
    setResponse(res.message);
  };

  const handleClickShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'start',
      minHeight: '100vh', // To ensure it takes full height of the screen
      backgroundColor:'#2C2C2C'
    }}>
      <Button 
      startIcon={<NavigateBefore />}
      sx={{float:'left'}}>
        Back
      </Button>
      <Box sx={{
        backgroundColor:'black',
        width:'100%',
        
      }}>
      <form onSubmit={handleSubmit} style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%', // Ensure the form takes up full width
        maxWidth: '400px', // Optional: limit the form width
        // backgroundColor:'black'
      }}>
        <Typography variant='h4'>Get Started</Typography>

        <TextField
          required
          id="displayName"
          label="Display Name"
          variant="outlined"
          size="small"
          value={displayName}
          type="text"
          onChange={(e) => setDisplayName(e.target.value)}
          fullWidth // Ensures full width
        />

        <TextField
          required
          id="email"
          label="Email"
          variant="outlined"
          size="small"
          value={email}
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          fullWidth // Ensures full width
        />

        <TextField
          required
          id="password"
          label="Password"
          variant="outlined"
          size="small"
          value={password}
          type={showPassword ? 'text' : 'password'}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth // Ensures full width
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handleClickShowPassword} edge="end">
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <FormControlLabel
          control={
            <Checkbox
              checked={checked}
              onChange={() => setChecked(prev => !prev)}
              inputProps={{ 'aria-label': 'controlled' }}
            />
          }
          label={
            <>
              By signing up, you agree with our{' '}
              <Link href="#">Terms and Conditions</Link>
            </>
          }
        />

        <Button type="submit" variant="contained" color="primary" sx={{ marginTop: 2 }}>
          Sign Up
        </Button>

        {response && <h6>{response}</h6>}
      </form>
      <div>
        <hr />
        <h5>Sign Up With</h5>
        <hr />
      </div>
      <Box>
        {/* Add relevant social media buttons */}
        <IconButton>
          {/* Example for Google sign up */}
          {/* <GoogleIcon /> */}
        </IconButton>
        <IconButton>
          {/* Add any other relevant icon */}
        </IconButton>
      </Box>
      <Typography>Already Have An Account? <Link href="/auth/login">Sign In</Link></Typography>
      </Box>
    </Box>
  );
}