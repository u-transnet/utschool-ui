import { createMuiTheme } from 'material-ui/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#26C6DA',
      main: '#00ACC1',
      dark: '#00838F',
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
