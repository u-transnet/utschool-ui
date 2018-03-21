import { createMuiTheme } from 'material-ui/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#64B5F6',
      main: '#2196F3',
      dark: '#1E88E5',
      contrastText: '#fff'
    },
    secondary: {
      light: '#ff7961',
      main: '#7ED321',
      dark: '#ba000d',
      contrastText: '#FFF'
    }
  }
});

export default theme;
