import React from 'react';
import { withStyles } from 'material-ui/styles';
import Card, { CardHeader, CardActions, CardContent } from 'material-ui/Card';
import IconButton from 'material-ui/IconButton';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import DoneIcon from 'material-ui-icons/Done';
import PlaceIcon from 'material-ui-icons/Place';
import SchoolIcon from 'material-ui-icons/School';
import MoreVertIcon from 'material-ui-icons/MoreVert';

const styles = theme => ({
    check: {
        backgroundColor: theme.palette.secondary.main,
        width: 20,
        height: 20,
        borderRadius: 10,
        color: '#fff',
        float: 'left',
        margin: '0 5px -2px 0'
    },
    flex: {
        display: 'flex'
    },
    status: {
        flex: 1,
        padding: 5,
        color: '#5B5B5B',
        flexDirection: 'column',
        fontSize: 14,
        marginBottom: 10
    },
    iconBig: {
        margin: '0 7px -7px 0'
    },
    icon: {
        padding: 2,
        width: 16,
        height: 16
    },
    grey: {
        color: '#888'
    },
    cardOne: {
        maxWidth: 640,
        margin: '0 auto',
        marginBottom: 15,
    },
    cardOne__actions: {
        margin: '10px 15px 5px 0'
    }
});



const StudentClassCard = (props) => {
    
    const take = () => {
        return (
            <div>
                <div className={props.classes.flex}>
                    <div className={props.classes.status}><Typography className={props.classes.grey} gutterBottom><PlaceIcon className={props.classes.iconBig} />{props.city}</Typography></div>
                    <div className={props.classes.status}><Typography className={props.classes.grey} gutterBottom><SchoolIcon className={props.classes.iconBig} />{props.teacher}</Typography></div>
                </div>
                <Button color="primary">Записаться</Button>
            </div>
        )
    }

    const actions = () => {
        return(
            <div>
                <CardActions className={props.classes.cardOne__actions}>
                    <div className={props.classes.status}>
                        <div className={props.classes.check}>
                            <DoneIcon className={props.classes.icon} />
                        </div>
                        <Typography className={props.classes.grey} gutterBottom>
                            Записан
                </Typography>
                    </div>
                    <div className={props.classes.status}>
                        <div className={props.classes.check}>
                            <DoneIcon className={props.classes.icon} />
                        </div>
                        <Typography className={props.classes.grey} gutterBottom>
                            Пришёл
                </Typography>
                    </div>
                    <div className={props.classes.status}>
                        <div className={props.classes.check}>
                            <DoneIcon className={props.classes.icon} />
                        </div>
                        <Typography className={props.classes.grey} gutterBottom>
                            Сдал
                </Typography>
                    </div>
                </CardActions>
            </div>
        );
    }

    return (
        <div>
            <Card className={props.classes.cardOne}>
                <CardHeader
                    action={
                        <IconButton>
                            <MoreVertIcon />
                        </IconButton>
                    }
                    title={props.title}
                />
                <CardContent>
                    <Typography component="p">
                        {props.description}
                    </Typography>
                </CardContent>
                {props.accepted === 'false' ? take() : actions() }

            </Card>
        </div>
    );
}

export default withStyles(styles)(StudentClassCard)