"use client"

import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useRouter } from 'next/navigation';
import CloseIcon from '@mui/icons-material/Close';

// hooks

import { useNotifications } from '@toolpad/core/useNotifications';

// mui
import {
  Button,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
  Box,
  Link,
} from '@mui/material';
import { Visibility, VisibilityOff, NavigateBefore } from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';
import GoogleIcon from '@mui/icons-material/Google';
import AppleIcon from '@mui/icons-material/Apple';
import useUserAuth from '@/app/hooks/userAuth';
import { useModalStore } from '@/app/store/useModalStore.js';

export default function SignIn() {
  const [showPassword, setShowPassword] = useState(false);
  const [response, setResponse] = useState('');
  const { login } = useUserAuth();
  const theme = useTheme();
  const router = useRouter();
  const {closeModal} = useModalStore()

  const notifications = useNotifications();

  const showNotification = (text, type) => {
    notifications.show(text, {
      severity: type,
      autoHideDuration: 3000,
    });
  };

  // Validation Schema using Yup
  const validationSchema = Yup.object({
    email: Yup.string()
      .email('Invalid email format')
      .required('Email is required'),
    password: Yup.string()
      .required('Password is required'),
  });

  // Formik Setup
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      const res = await login(values.email, values.password);
      // showNotification('log in successfully', 'success');
      console.log(res);
      setResponse(res.message);
      if (res.message === 'success') {
        // showNotification('log in successfully', 'success');
        resetForm();
        return router.push('/dashboard');
      }
      showNotification(res.message, 'error');
      console.log(res)
    },
  });

  const handleClickShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const inputStyle = {
    margin: '20px',
    width: '85%',
    minWidth: '150px',
    maxWidth: '400px',
    '& .MuiOutlinedInput-root': {
      color: (theme) => theme.customColors.grey,
      '& fieldset': {
        borderRadius: '10px',
        height: '3em',
        color: (theme) => theme.customColors.grey,
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
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'start',
        backgroundColor: (theme) => theme.customColors.green,
        borderRadius:"15px"
      }}
    >
      <Box sx={{ height: '20%', width:'100%', textAlign:'right' }}>
        <IconButton
          sx={{ marginBottom: '30px', marginTop: '10px', marginRight:"15px"}}
          onClick={() => closeModal()}
        >
          <CloseIcon />
        </IconButton>
      </Box>
      <Box
        sx={{
          backgroundColor: 'background.default',
          width: '100%',
          borderRadius:"15px",
          borderTopLeftRadius: '20px',
          borderTopRightRadius: '20px',
          paddingTop: '15px',
          // height: "80%",
          paddingRight: '10px',
          paddingLeft: '10px',
        }}
      >
        <form
          onSubmit={formik.handleSubmit}
          style={{
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
          <Typography variant="h5" sx={{ marginBottom: '20px' }}>
            Welcome Back
          </Typography>

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
            {...formik.getFieldProps('email')}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />

          <TextField
            autoComplete="swift-shopping-password"
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
            required
            size="small"
            sx={inputStyle}
            type={showPassword ? 'text' : 'password'}
            {...formik.getFieldProps('password')}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
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

          <div
            style={{
              width: '85%',
              minWidth: '150px',
              maxWidth: '400px',
              textAlign: 'left',
            }}
          >
            <Link href="#" sx={{ color: (theme) => theme.customColors.green, fontSize: '0.8em' }}>Forgot Password?</Link>
          </div>

          <Button
            type="submit"
            variant="contained"
            color="primary"
            // onClick={() => showNotification('log in successfully', 'success')}
            sx={{
              textTransform: 'none',
              width: '85%',
              minWidth: '150px',
              maxWidth: '400px',
              marginTop: '20px',
              marginBottom: '5px',
              borderRadius: '20px',
              height: '3em',
              backgroundColor: (theme) => theme.customColors.green,
              '&.Mui-disabled': {
                backgroundColor: 'grey',
              },
            }}
            disabled={Object.keys(formik.errors).length > 0}

          >
            Sign In
          </Button>
          {/* {response && <Typography color="error">{response}</Typography>} */}
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
          <Typography
            variant="body1"
            sx={{ margin: 0, whiteSpace: 'nowrap' }}
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
        <Box
          sx={{
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
        <Typography
          variant="body2"
          sx={{ textAlign: 'center', marginTop: '20px', marginBottom: '20px' }}
        >
          Don't Have An Account?
          {' '}
          <Link sx={{ color: (theme) => theme.customColors.green }} href="/auth/signup">
            Sign Up
          </Link>
        </Typography>
      </Box>
    </Box >
  );
}