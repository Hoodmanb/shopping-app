'use client';

import React, { useState } from 'react';
import {
  FormControlLabel, Button, IconButton, InputAdornment, Box, Checkbox, Typography, TextField, Link,
} from '@mui/material';
import { Visibility, VisibilityOff, NavigateBefore } from '@mui/icons-material';
import GoogleIcon from '@mui/icons-material/Google';
import AppleIcon from '@mui/icons-material/Apple';
import { useTheme } from '@mui/material/styles';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { useNotifications } from '@toolpad/core/useNotifications';
import useUserAuth from '@/app/hooks/userAuth.js';
import { useRouter } from 'next/navigation';


const validationSchema = Yup.object().shape({
  displayName: Yup.string().required('Display Name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string()
    .min(4, 'Password must be at least 6 characters')
    .required('Password is required'),
});

export default function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [checked, setChecked] = useState(false);
  const { signup } = useUserAuth();
  const theme = useTheme();
  const router = useRouter()


  const notifications = useNotifications();
  const showNotification = (text, type) => {
    notifications.show(text, {
      severity: type,
      autoHideDuration: 3000,
    });
  };

  const handleClickShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const inputStyle = {
    margin: '20px',
    width: '85%',
    minWidth: '150px',
    maxWidth: '400px',
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderRadius: '10px',
        height: '3em',
      },
      '&:focus-within fieldset': {
        // Focus state for the fieldset
        borderColor: (theme) => theme.customColors.green, // Example: Change border color on focus
        borderWidth: '2px', // Example: Change border width on focus
      },
    },
  };

  const iconStyles = {
    color: (theme) => theme.customColors.green,
    border: `1px solid ${theme.customColors.green}`,
    borderRadius: '50%',
    margin: '10px',
  };

  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'start',
      backgroundColor: (theme) => theme.customColors.green,
    }}
    >
      <IconButton
        sx={{ marginBottom: '30px', marginTop: '10px', marginLeft: "20px" }}
        onClick={() => router.back()}
      >
        <NavigateBefore />
      </IconButton>
      <Box sx={{
        backgroundColor: 'background.default',
        width: '100%',
        borderTopLeftRadius: '20px',
        borderTopRightRadius: '20px',
        paddingTop: '15px',
        paddingBottom: '10px',
        paddingRight: '10px',
        paddingLeft: '10px',
      }}
      >
        <Formik
          initialValues={{ displayName: '', email: '', password: '' }}
          validationSchema={validationSchema}
          onSubmit={async (values, { resetForm }) => {
            const res = await signup(values.email, values.password, values.displayName);
            if (res.message === 'success') {
              showNotification('log in successfully', 'success');
              resetForm();
              return router.push('/dashboard');
            }
            showNotification(res.message, 'error');
            console.log(res.message)
          }}
        >
          {({ errors, touched, getFieldProps }) => (
            <Form style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              width: '100%',
              maxWidth: '400px',
              margin: 'auto',
              marginBottom: '20px',
            }}
            >
              <Typography variant="h5" sx={{ marginBottom: '20px' }}>Get Started</Typography>

              <TextField
                autoComplete="swift-shopping-displayname"
                required
                id="displayName"
                label="Display Name"
                slotProps={{
                  inputLabel: {
                    sx: {
                      color: (theme) => theme.customColors.grey, // Default color

                    },
                  },
                }}
                variant="outlined"
                size="small"
                fullWidth
                sx={inputStyle}
                {...getFieldProps('displayName')}
                error={touched.displayName && Boolean(errors.displayName)}
                helperText={touched.displayName && errors.displayName}
              />

              <TextField
                autoComplete="swift-shopping-email"
                required
                id="email"
                label="Email"
                slotProps={{
                  inputLabel: {
                    sx: {
                      color: (theme) => theme.customColors.grey, // Default color

                    },
                  },
                }}
                variant="outlined"
                size="small"
                sx={inputStyle}
                {...getFieldProps('email')}
                error={touched.email && Boolean(errors.email)}
                helperText={touched.email && errors.email}
              />

              <TextField
                autoComplete="swift-shopping-password"
                required
                id="password"
                label="Password"
                slotProps={{
                  inputLabel: {
                    sx: {
                      color: (theme) => theme.customColors.grey, // Default color

                    },
                  },
                }}
                variant="outlined"
                size="small"
                sx={inputStyle}
                type={showPassword ? 'text' : 'password'}
                {...getFieldProps('password')}
                error={touched.password && Boolean(errors.password)}
                helperText={touched.password && errors.password}
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
                sx={{
                  margin: 'auto',
                  width: '85%',
                  minWidth: '150px',
                  maxWidth: '400px',
                  fontSize: '0.8em',
                }}
                control={(
                  <Checkbox
                    checked={checked}
                    onChange={() => setChecked((prev) => !prev)}
                    inputProps={{ 'aria-label': 'controlled' }}
                    sx={{
                      padding: '0',
                      marginRight: '5px',
                      color: 'text.primary',
                      '&.Mui-checked': {
                        color: (theme) => theme.customColors.green, // Change color when checked
                      },
                      '&.MuiSvg-root': { // targets the svg icon itself
                      },
                    }}
                    size="large"
                  />
                )}
                label={(
                  <Typography variant="body1" sx={{ fontSize: '1em' }}>
                    By signing up, you agree with our
                    {' '}
                    <Link sx={{ color: (theme) => theme.customColors.green }} href="#">Terms and Conditions</Link>
                  </Typography>
                )}
              />

              <Button
                type="submit"
                variant="contained"
                sx={{
                  marginTop: '20px',
                  marginBottom: '5px',
                  color: theme.customColors.secondary,
                  borderRadius: '20px',
                  height: '3em',
                  width: '85%',
                  minWidth: '150px',
                  maxWidth: '400px',
                  textTransform: 'none',
                  backgroundColor: (theme) => theme.customColors.green,
                  '&.Mui-disabled': {
                    backgroundColor: 'grey',
                  },
                }}
                disabled={Object.keys(errors).length > 0 || checked === false}
              >
                Sign Up
              </Button>

            </Form>
          )}
        </Formik>
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
          <Typography
            variant="body1"
            style={{ margin: 0, whiteSpace: 'nowrap' }}
          >
            Sign Up With
          </Typography>
          <hr
            style={{
              flex: 1,
              border: 'none',
              borderTop: '2px solid #ccc',
            }}
          />
        </div>
        <Box sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
        >
          <IconButton
            sx={iconStyles}
            onClick={() => showNotification('feature not available yet', 'info')}
          >
            <GoogleIcon />
          </IconButton>
          <IconButton
            sx={iconStyles}
            onClick={() => showNotification('feature not available yet', 'info')}
          >
            <AppleIcon />
          </IconButton>
        </Box>
        <Typography variant="body2" sx={{ textAlign: 'center', marginTop: '20px' }}>
          Already Have An Account?
          <Link sx={{ color: (theme) => theme.customColors.green }} href="/auth/login">Sign In</Link>
        </Typography>
      </Box>
    </Box>
  );
}
