import { createTheme, ThemeOptions } from '@mui/material/styles';
// A custom theme for this app

const themeOptions: ThemeOptions = {
  palette: {
    primary: {
      main: 'rgba(2, 224, 177, 1)',
      contrastText: '#fff',

    },
    secondary: {
      main: '#fff',
    },
  },

};
const theme = createTheme(themeOptions);

export default theme;
