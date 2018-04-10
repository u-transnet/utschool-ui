import React from 'react';
import Header from './header';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import theme from '../stores/theme';

const App = ({ match: { params } }) => {
  return (
    <MuiThemeProvider theme={theme}>
      <Header />
    </MuiThemeProvider>
  );
};

export default App;
