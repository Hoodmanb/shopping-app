// 'use client';

// import React, { useState, useEffect, useMemo, useRef, createContext, useContext } from 'react';
// import { ThemeProvider, CssBaseline, useMediaQuery } from '@mui/material';
// import { CacheProvider } from "@emotion/react";
// import createEmotionCache from "@/app/lib/mui-emotion-cache.js";
// import { darkTheme, lightTheme } from '@/public/css-files/theme.js';
// import '@/public/css-files/Global.css';
// import { initAuthListener } from '@/app/store/authStore';
// import { NotificationsProvider } from '@toolpad/core/useNotifications';
// import Resize from './components/Resize';

// // Create Theme Context
// const ThemeContext = createContext({
//   theme: lightTheme,
//   toggleTheme: () => { },
// });

// const clientSideEmotionCache = createEmotionCache();


// export const useThemeContext = () => useContext(ThemeContext);

// export default function RootLayout({ children }) {
//   const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
//   const [mode, setMode] = useState(prefersDarkMode ? 'dark' : 'light');

//   const boxRef = useRef(null);
//   const [width, setWidth] = useState(0);

//   useEffect(() => {
//     const observer = new ResizeObserver((entries) => {
//       if (entries[0]) {
//         setWidth(entries[0].contentRect.width);
//       }
//     });
//     if (boxRef.current) {
//       observer.observe(boxRef.current);
//     }

//     return () => observer.disconnect();
//   }, []);

//   useEffect(() => {
//     initAuthListener();
//   }, []);

//   const toggleTheme = () => {
//     setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
//   };

//   const theme = useMemo(() => (mode === 'light' ? lightTheme : darkTheme), [mode]);

//   const value = useMemo(() => ({ theme, toggleTheme }), [theme]);

//   return (
//     <html lang="en" ref={boxRef}>
//       <head>
//         {/* PWA Meta Tags */}
//         <link rel="manifest" href="/manifest.json" />
//         <link rel="icon" href="/favicon.ico" />

//         <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
//         <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
//         <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
//         <link rel="manifest" href="/site.webmanifest" />
//         <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
//         <meta name="msapplication-TileColor" content="#da532c" />
//         <meta name="theme-color" content="#ffffff" />

//         {/* Optionally, you can add other meta tags or custom links */}
//         <meta name="description" content="An online shopping..." />
//         <meta name="viewport" content="width=device-width, initial-scale=1" />
//         <title>Hawk Mart</title>
//       </head>
//       <body >


//         <ThemeContext.Provider value={value}>
//           <ThemeProvider theme={theme}>
//             <CssBaseline />
//             <NotificationsProvider autoHideDuration={3000} pauseOnHover={true}>
//               <CacheProvider value={clientSideEmotionCache}>
//                 {width >= 450 ? <Resize /> : children}
//               </CacheProvider>
//             </NotificationsProvider>
//           </ThemeProvider>
//         </ThemeContext.Provider>
//       </body>
//     </html>
//   );
// }



'use client';

import React, { useState, useEffect, useMemo, useRef, createContext, useContext } from 'react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { CacheProvider } from "@emotion/react";
import createEmotionCache from "@/app/lib/mui-emotion-cache.js";
import { darkTheme, lightTheme } from '@/public/css-files/theme.js';
import '@/public/css-files/Global.css';
import { initAuthListener } from '@/app/store/authStore';
import { NotificationsProvider } from '@toolpad/core/useNotifications';
import Resize from './components/Resize';

// Create Theme Context
const ThemeContext = createContext({
  theme: lightTheme,
  toggleTheme: () => { },
});

// Create a client-side cache, shared for the whole session
const clientSideEmotionCache = createEmotionCache();

export const useThemeContext = () => useContext(ThemeContext);

export default function RootLayout({ children }) {
  // Using useEffect to handle client-side only code
  const [mounted, setMounted] = useState(false);
  const [prefersDarkMode, setPrefersDarkMode] = useState(false);
  const [mode, setMode] = useState('light'); // Default to light for server render
  const [width, setWidth] = useState(449); // Default to desktop for server render
  const containerRef = useRef(null);

  useEffect(() => {
    setMounted(true);
    // Check dark mode preference on client side
    const darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)');
    setPrefersDarkMode(darkModeQuery.matches);
    setMode(darkModeQuery.matches ? 'dark' : 'light');

    // Initialize auth listener
    initAuthListener();

    // Set up resize observer
    const observer = new ResizeObserver((entries) => {
      if (entries[0]) {
        setWidth(entries[0].contentRect.width);
      }
    });

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const toggleTheme = () => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };

  const theme = useMemo(() => (mode === 'light' ? lightTheme : darkTheme), [mode]);
  const value = useMemo(() => ({ theme, toggleTheme }), [theme]);

  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff" />
        <meta name="description" content="An online shopping..." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Hawk Mart</title>
      </head>
      <body>
        <div ref={containerRef} style={{ width: '100%', height: '100%' }}>
          <ThemeContext.Provider value={value}>
            {/* <CacheProvider value={clientSideEmotionCache}> */}
            <ThemeProvider theme={theme}>
              <CssBaseline />
              <NotificationsProvider autoHideDuration={3000} pauseOnHover={true}>
                {width >= 450 ? <Resize /> : children}
              </NotificationsProvider>
            </ThemeProvider>
            {/* </CacheProvider> */}
          </ThemeContext.Provider>
        </div>
      </body>
    </html>
  );
}