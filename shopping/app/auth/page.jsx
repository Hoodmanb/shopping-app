'use client';

import { Box, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import Link from 'next/link';
import styles from "@/public/css-files/Auth.module.css"

export default function Auth() {
  const theme = useTheme(); // Access the current theme

  return (
    <Box
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      <Typography
        variant="h2"
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '88%',
        }}
      >
        Welcome!
      </Typography>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-around',
          height: '12%',
          width: '100%',
        }}
      >
        <Link className={`${styles.sign} `} href="/auth/login">
          <span>Sign In</span>
        </Link>

        <Link
          className={`${styles.sign}`}
          style={{
            backgroundColor: theme.customColors.primary,
            color: theme.customColors.secondary,
            borderTopLeftRadius: '1.4em',
          }}
          href="/auth/signup"
        >
          <span>Sign Up</span>
        </Link>
      </Box>
    </Box>
  );
}
