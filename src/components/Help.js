import React from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import theme from '../stores/theme';
import Header from './Header';

const Help = ({ match: { params } }) => {
  return (
    <MuiThemeProvider theme={theme}>
      <Header/>
      <p>Помощь</p>
    </MuiThemeProvider>
  )
}

export default Help