import { ReactElement } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import { SnackbarProvider } from 'notistack';
import theme from './Utils/Theme';
import { UserProvider } from './Utils/ContextAPI';

type Props = {
  children: ReactElement
};

const Providers = ({ children }: Props) => (
  <UserProvider>

    <ThemeProvider theme={theme}>
      <SnackbarProvider maxSnack={3}>
        <CssBaseline />
        {children}
      </SnackbarProvider>
    </ThemeProvider>

  </UserProvider>
);

export default Providers;
