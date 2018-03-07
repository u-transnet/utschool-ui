import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from 'material-ui/styles';
import Tabs, { Tab } from 'material-ui/Tabs';
import { toggleStudentTab } from '../actions';
import StudentClassCard from './StudentClassCard';
import allClasses from '../stores/classesTempData';


const styles = theme => ({
    tab: {
        flexGrow: 1,
        backgroundColor: theme.palette.primary.main,
        opacity: 1,
        color: '#fff'
    },
    tab__container: {
        padding: 10,
        listStyle: 'none'
    }
});


const TabContainer = (props) => {
    return (
        <div>
            {[props.children]}
        </div>
    );
}

let classesNew = allClasses.filter(function (theClass) {
    return theClass['accepted'] === "false";
});

const classesList = classesNew.map((classes, index) => {
    return <StudentClassCard {...classes} key={index} />
});

let classesAccepted = allClasses.filter(function (theClass) {
    return theClass['accepted'] === "true";
});

const acceptedClassesList = classesAccepted.map((classes, index) => {
    return <StudentClassCard {...classes} key={index} />
}); 


const DashboardStudentContent = (props) => {

    
    return(
        <div>
            <Tabs value={props.studentTab} onChange={props.onToggleTab}>
                <Tab label="Возможныe" className={props.classes.tab } />
                <Tab label="Мои" className={props.classes.tab} />
            </Tabs>
            {props.studentTab === 0 && <TabContainer>{classesList}</TabContainer>}
            { props.studentTab === 1 && <TabContainer>{acceptedClassesList}</TabContainer>}
        </div>
    );
}

function mapStateToProps(state) {
    return {
        studentTab: state.student.studentTab
    };
}

const mapDispatchToProps = (dispatch) => ({
    onToggleTab(event, value) {
        dispatch(toggleStudentTab(value))
    },
})



export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(DashboardStudentContent))