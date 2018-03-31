// @flow

import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import Avatar from 'material-ui/Avatar';
import Typography from 'material-ui/Typography';
import { FormControlLabel } from 'material-ui/Form';
import Checkbox from 'material-ui/Checkbox';
import Button from 'material-ui/Button';
import Input, { InputLabel } from 'material-ui/Input';
import { FormControl, FormHelperText } from 'material-ui/Form';
import { setUserName } from '../actions/actionsUser';

const styles = theme => ({
  Login__base: {
    maxWidth: 242,
    margin: '0 auto',
    marginTop: '15%'
  },
  Login__header: {
    marginBottom: 35,
    marginTop: 25,
    textAlign: 'center'
  },
  Login__avatar: {
    width: 78,
    height: 78,
    backgroundColor: '#ddd',
    margin: '0 auto'
  },
  Login__field: {
    width: '100%',
    paddingBottom: 24
  },
  button: {
    margin: '10px auto 0 auto',
    width: 168,
    display: 'block',
    textAlign: 'center'
  },
  check: {
    marginBottom: 32
  }
});

const Login = props => {
  return (
    <div className={props.classes.Login__base}>
      <form>
        <Grid container spacing={0}>
          <Grid item xs={12}>
            <Avatar alt="Logo" src="" className={props.classes.Login__avatar} />
          </Grid>

          <Grid item xs={12}>
            <Typography
              variant="headline"
              component="h1"
              className={props.classes.Login__header}
            >
              UT-SCHOOL
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <FormControl
              className={props.classes.Login__field}
              error={props.userLogin}
            >
              <InputLabel htmlFor="name">Номер учётки</InputLabel>
              <Input
                onKeyUp={props.onSetUserName}
                id="name"
                defaultValue={props.userName}
                autoFocus
              />
              <FormHelperText id="weight-helper-text">
                Такая запись уже существует
              </FormHelperText>
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <FormControl className={props.classes.Login__field}>
              <InputLabel htmlFor="adornment-password">Пароль</InputLabel>
              <Input
                id="adornment-password"
                type="password"
                value=""
                onChange=""
              />
              <FormHelperText id="weight-helper-text">
                8 символов минимум, одина цифра.
              </FormHelperText>
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <FormControlLabel
              className={props.classes.check}
              control={<Checkbox onChange="" color="primary" />}
              label="Запомнить меня"
            />
          </Grid>

          <Grid item xs={12}>
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
  onSetUserName(event) {
    dispatch(setUserName(event.target.value));
  }
});

export default withStyles(styles)(
  connect(mapStateToProps, mapDispatchToProps)(Login)
);
