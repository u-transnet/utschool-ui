import React from 'react';
import { Link } from 'react-router-dom';
import { withStyles } from 'material-ui/styles';
import Card, { CardHeader, CardActions, CardContent } from 'material-ui/Card';
import IconButton from 'material-ui/IconButton';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';

const styles = theme => ({
  check: {
    backgroundColor: theme.palette.secondary.main,
    width: 30,
    height: 20,
    borderRadius: 4,
    color: '#fff',
    float: 'left',
    margin: '0 5px 0 0',
    textAlign: 'center',
    paddingTop: 2
  },
  checkPrimary: {
    backgroundColor: theme.palette.primary.main,
    width: 30,
    height: 20,
    borderRadius: 4,
    color: '#fff',
    float: 'left',
    margin: '0 5px 0 0',
    textAlign: 'center',
    paddingTop: 2
  },
  flex: {
    display: 'flex'
  },
  status: {
    flex: 1,
    flexDirection: 'column'
  },
  iconBig: {
    margin: '0 7px -7px 0'
  },
  icon: {
    padding: 2,
    width: 16,
    height: 16
  },
  cardOne: {
    maxWidth: 640,
    margin: '0 auto',
    marginBottom: 15
  }
});

const StudentClassCard = props => {
  const classLink = '/teacher-class-applicants/' + props.id + '/0';
  const classLinkAccepted = '/teacher-class-applicants/' + props.id + '/1';

  return (
    <div>
      <Card className={props.classes.cardOne}>
        <CardHeader action={<IconButton />} title={props.title} />
        <CardContent>
          <Typography component="p">{props.description}</Typography>
        </CardContent>
        <CardActions className={props.classes.flex}>
          <div className={props.classes.status}>
            <Button component={Link} to={classLink}>
              <div className={props.classes.checkPrimary}>7</div>
              <Typography>Записалось</Typography>
            </Button>
          </div>
          <div className={props.classes.status}>
            <Button component={Link} to={classLinkAccepted}>
              <div className={props.classes.check}>3</div>
              <Typography>Приняты</Typography>
            </Button>
          </div>
        </CardActions>
      </Card>
    </div>
  );
};

export default withStyles(styles)(StudentClassCard);
