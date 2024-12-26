'use client';

import React, { useState, useEffect } from 'react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { darkTheme, lightTheme } from '@/app/assets/css-files/theme.js';
import "@/app/assets/css-files/Global.css"

export default function RootLayout({ children }) {
  const [theme, setTheme] = useState(darkTheme);

  useEffect(() => {
    const preferredTheme = localStorage.getItem('country-api-theme');
    if (preferredTheme) {
      setTheme(preferredTheme === 'dark' ? darkTheme : lightTheme);
    } else {
      localStorage.setItem('country-api-theme', 'dark');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === lightTheme ? darkTheme : lightTheme;
    setTheme(newTheme);
    localStorage.setItem('country-api-theme', newTheme === darkTheme ? 'dark' : 'light');
  };
  
  
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <html>
        <body>
          {children}
        </body>
      </html>
    </ThemeProvider>
  );
}