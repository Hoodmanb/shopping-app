"use client"

import React, { useState } from 'react';

// hooks
import useUserAuth from "@/app/hooks/userAuth.js"

// mui
import { FormControlLabel, Button, IconButton, InputAdornment, Box, Checkbox, Typography, TextField, Link } from '@mui/material';
import { Visibility, VisibilityOff, NavigateBefore } from '@mui/icons-material';
import GoogleIcon from '@mui/icons-material/Google';
import AppleIcon from '@mui/icons-material/Apple';
import {useTheme} from "@mui/material/styles"

export default function SignUp() {
  const [email, setEmail] = useState('');
  const [displayName, setDisplayName] = useState("");
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [response, setResponse] = useState("");
  const [checked, setChecked] = useState(false);

  // Destructure functions correctly from userAuth
  const { signup } = useUserAuth();
  
  const theme = useTheme();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const userData = { email, password, displayName };
    const res = await signup(email, password);
    setResponse(res.message);
  };

  const handleClickShowPassword = () => {
    setShowPassword((prev) => !prev);
  };
  
  const inputStyle = {
    margin:"20px",
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        // borderColor: "white", // Border color
        borderRadius:'20px',
        height:'3.5em',
      }
    }
  }
  
  const iconStyles = {
    color:'text.primary',
    border:`1px solid ${theme.customColors.primary}`,
    borderRadius:'50%',
    margin:'10px'
  }

  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'start',
      // minHeight: '100vh',
      // height:'100vh',
      backgroundColor:'#2C2C2C'
    }}>
      <Button 
      startIcon={<NavigateBefore />}
      sx={{marginBottom:'30px', marginTop:'10px'}}>
        Back
      </Button>
      <Box sx={{
        backgroundColor:'background.default',
        width:'100%',
        borderTopLeftRadius:'20px',
        borderTopRightRadius:'20px',
        paddingTop:'15px',
        paddingBottom:'10px',
        paddingRight:'10px',
        paddingLeft:'10px'
        
      }}>
      <form onSubmit={handleSubmit} style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%', // Ensure the form takes up full width
        maxWidth: '400px',
        margin:'auto',
        marginBottom:'20px'
      }}>
        <Typography variant='h4'
        sx={{marginBottom:'20px'}}>Get Started</Typography>

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
          sx={inputStyle}
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

        <FormControlLabel
        sx={{margin:'auto'}}
          control={
            <Checkbox
              checked={checked}
              onChange={() => setChecked(prev => !prev)}
              inputProps={{ 'aria-label': 'controlled' }}
              sx={{
                padding:'0',
                marginRight:'5px'
              }}
              size="large"
            />
          }
          label={
            <>
              By signing up, you agree with our{' '}
              <Link sx={{color:'blue'}} href="#">Terms and Conditions</Link>
            </>
          }
        />

        <Button type="submit" variant="contained" sx={{ 
            marginTop: '20px',
            marginBottom:'5px',
            backgroundColor:theme.customColors.primary,
            color:theme.customColors.secondary,
            borderRadius:'20px',
            height:'3.5em'
          }}
          fullWidth>
          Sign Up
        </Button>

        {response && <Typography color='red'>{response}</Typography>}
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
      <Typography sx={{textAlign:'center', marginTop:'20px'}}>Already Have An Account? <Link sx={{color:'blue'}} href="/auth/login">Sign In</Link></Typography>
      </Box>
    </Box>
  );
}