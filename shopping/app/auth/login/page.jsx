"use client"

import React, { useState } from 'react';
// import Link from "next/link";

//hooks
import useUserAuth from "../../hooks/userAuth.js"

// mui
import { FormControl, Input, InputLabel, FormHelperText, Button, IconButton, InputAdornment, TextField, Checkbox, Typography, Box, Link } from '@mui/material';
import { Visibility, VisibilityOff, NavigateBefore } from '@mui/icons-material';
import { useTheme } from "@mui/material/styles"

import GoogleIcon from '@mui/icons-material/Google';
import AppleIcon from '@mui/icons-material/Apple';


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
  
  const theme = useTheme()
  
  const inputStyle = {
    margin:"20px",
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderRadius:'20px',
        height:'3.5em',
      },
    },
  }
  
  const iconStyles = {
    color:'text.primary',
    border:`1px solid ${theme.customColors.primary}`,
    borderRadius:'50%',
    margin:'10px'
  }
  
  return (
    <Box
    sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'start',
      height:'100%',
      // minHeight: '100vh',
      // height:'100vh',
      backgroundColor:'#2C2C2C'
    }}>
    <Box sx={{height:'20%'}}>
    <Button 
      startIcon={<NavigateBefore />}
      sx={{marginBottom:'20px', marginTop:'10px'}}>
        Back
    </Button>
    </Box>
      <Box sx={{
        backgroundColor:'background.default',
        width:'100%',
        borderTopLeftRadius:'20px',
        borderTopRightRadius:'20px',
        paddingTop:'15px',
        // paddingBottom:'10px',
        height:'80%',
        paddingRight:'10px',
        paddingLeft:'10px'
        
      }}>
    <form onSubmit={handleSubmit}
    style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%', // Ensure the form takes up full width
        maxWidth: '400px',
        margin:'auto',
        marginBottom:'20px'}}>
      <Typography variant='h4' sx={{marginBottom:'20px'}}>Welcome Back</Typography>
      
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
          sx={inputStyle}
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
          sx={inputStyle}
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
        <div style={{width:'100%', textAlign:'left'}}>
        <Link href='#'>Forgot Password?</Link>
        </div>

        <Button type="submit" variant="contained" color="primary" sx={{ 
            marginTop: '20px',
            marginBottom:'5px',
            borderRadius:'20px',
            height:'3.5em'
          }}
          fullWidth>
          Sign In
        </Button>
      {response && <h6>{response}</h6>}
    </form>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '10px',
        }}
      >
        <hr
          style={{
            flex: 1,
            border: 'none',
            borderTop: '2px solid #ccc',
          }}
        />
        <h5
          style={{
            margin: 0,
            whiteSpace: 'nowrap',
          }}
        >
          Sign Up With
        </h5>
        <hr
          style={{
            flex: 1,
            border: 'none',
            borderTop: '2px solid #ccc',
          }}
        />
      </div>
      <Box sx={{
        display:'flex',
        justifyContent:'center',
        alignItems:'center'
      }}>
        <IconButton 
        sx={iconStyles}>
          <GoogleIcon/>
        </IconButton>
        <IconButton 
        sx={iconStyles}>
          <AppleIcon/>
        </IconButton>
      </Box>
      <Typography sx={{textAlign:'center', marginTop:'20px'}}>Don't Have An Account? <Link sx={{color:'blue'}} href="/auth/signup">Sign Up</Link></Typography>
      </Box>
      </Box>
  );
}