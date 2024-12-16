import { Box, Typography } from '@mui/material';
import styles from "@/app/assets/css-files/Auth.module.css";
import Link from "next/link";

export default function Auth() {
  return (
    <Box 
      sx={{
        height: '100%',
        backgroundColor: 'black',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        color:'white'
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
        <Link className={`${styles.sign} ${styles.signin}`} href="/auth/login">
          <span className={styles.span}>Sign In</span>
        </Link>
        <Link className={`${styles.sign} ${styles.signup}`} href="/auth/signup">
          <span className={styles.span}>Sign Up</span>
        </Link>
      </Box>
    </Box>
  );
}