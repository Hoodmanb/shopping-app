import { createTheme } from '@mui/material/styles';

export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#555555',
    },
    secondary: {
      main: '#9c27b0',
    },
    background: {
      default: '#FFFFFF',
      paper: '#EFEFEF',
    },
    text: {
      primary: '#000000',
      secondary: '#FFFFFF',
    },
  },
  customColors: {
    primary: '#000000',
    secondary: '#2C2C2C',
    green: '#2ECC71',
    grey: '#616161',
  },

  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: '#2ECC71',
            borderWidth: '2px',
          },
          '&:hover .MuiOutlinedInput-notchedOutline': { //Added hover to MuiOutlinedInput
            borderColor: '#2ECC71',
          }
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          '&:hover': {
            // backgroundColor: 'rgba(46, 204, 113, 0.1)', // Add a light green background on hover
          },
          '&.Mui-focused': {
            //any other focus related changes can be done here.
          }
        }
      }
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: '#616161', // Default label color
          '&.Mui-focused': { // Corrected focused state override
            color: '#2ECC71', // Label color when focused
          },
        },
      },
    },
    MuiInputAdornment: { // Add this section to customize the adornment
      styleOverrides: {
        root: {
          color: '#616161', // Default adornment color
        },
      },
    },
    // MuiSvgIcon: { // Add this section to customize the icon adornment, if using icons.
    //   styleOverrides: {
    //     root: {
    //       color: '#9E9E9E' // Default icon adornment color
    //     }
    //   }
    // }
  },
});

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',

    primary: {
      main: '#FFFFFF',
    },
    secondary: {
      main: '#F9FEFE',
    },
    background: {
      default: '#000000',
      paper: '#293641',
    },
    text: {
      primary: '#FFFFFF',
      secondary: '#A1A1A1',
    },
  },
  customColors: {
    primary: '#FFFFFF',
    secondary: '#000000',
  },
});
