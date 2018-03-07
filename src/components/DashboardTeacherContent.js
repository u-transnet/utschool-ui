import React from 'react';
import { withStyles } from 'material-ui/styles';
import TeacherClassCard from './TeacherClassCard';
import allClasses from '../stores/classesTempData';

const styles = theme => ({
    divPad: {
        padding: 8
    },
});

const TeacherClassList = allClasses.map((classes, index) => {
    return <TeacherClassCard {...classes} key={index} />
});

const DashboardStudentContent = (props) => {

    return (
        <div>
            <div className={props.classes.divPad}>
                {TeacherClassList}
            </div>
        </div>
    );
}


export default withStyles(styles)(DashboardStudentContent)