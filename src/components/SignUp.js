import React from 'react';
import { connect } from 'react-redux';
import { setUsername } from '../actions';
import { Link } from 'react-router-dom';
import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import Avatar from 'material-ui/Avatar';
import Typography from 'material-ui/Typography';
import TextField from 'material-ui/TextField';
import { FormControlLabel } from 'material-ui/Form';
import Checkbox from 'material-ui/Checkbox';
import Button from 'material-ui/Button';

const styles = theme => ({
  Login__base: {
    maxWidth: '320px',
    margin: '0 auto',
    marginTop: '15%'
  },
  Login__header: {
    marginBottom: '35px',
    marginTop: '25px'
  },
  Login__avatar: {
    width: '78px',
    height: '78px',
    backgroundColor: '#ddd'
  },
  button: {
    marginTop: '10px',
    width: '169px'
  },
  check: {
    marginLeft: '60px',
    marginBottom: '35px'
  },
  wrap: {
    width: '100%',
    overflowX: 'hidden',
    paddingBottom: 10
  }
});

const Login = props => {
  return (
    <div className={props.classes.Login__base}>
      <form>
        <Grid container className={props.classes.wrap}>
          <Grid item xs={12} md={12} lg={12}>
            <Grid container justify="center">
              <Avatar
                alt="Logo"
                src=""
                className={props.classes.Login__avatar}
              />
            </Grid>
          </Grid>

          <Grid item xs={12} md={12} lg={12}>
            <Grid container justify="center">
              <Typography
                variant="headline"
                component="h1"
                className={props.classes.Login__header}
              >
                UT-SCHOOL
              </Typography>
            </Grid>
          </Grid>

          <Grid item xs={12} md={12} lg={12}>
            <Grid container justify="center">
              <TextField
                onKeyUp={props.onSetUsername}
                defaultValue={props.userName}
                id="name"
                label="Номер учётки"
                className="Login__field"
                margin="normal"
                autoFocus
              />
            </Grid>
          </Grid>

          <Grid item xs={12} md={12} lg={12}>
            <Grid container justify="center">
              <TextField
                id="name"
                label="Пароль"
                className="Login__field"
                margin="normal"
              />
            </Grid>
          </Grid>

          <Grid item xs={12} md={12} lg={12}>
            <Grid container className={props.classes.check}>
              <FormControlLabel
                control={<Checkbox onChange="" color="primary" />}
                label="Запомнить меня"
              />
            </Grid>
          </Grid>

          <Grid item xs={12} md={12} lg={12}>
            <Grid container justify="center">
              <Button
                variant="raised"
                size="medium"
                color="primary"
                className={props.classes.button}
                component={Link}
                to={'/dashboard-student'}
              >
                Создать акаунт
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

function mapStateToProps(state) {
  return {
    userName: state.user.userName
  };
}

const mapDispatchToProps = dispatch => ({
  onSetUsername(event) {
    dispatch(setUsername(event.target.value));
  }
});

export default withStyles(styles)(
  connect(mapStateToProps, mapDispatchToProps)(Login)
);
