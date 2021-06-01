import React from "react";
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import {
    ContactMail,
    LocalShipping,
    Payment,
} from '@material-ui/icons';
import { Grid } from "@material-ui/core";


const useStyle = makeStyles(theme => ({
    root: {
        backgroundColor: '#ccc',
        zIndex: 1,
        color: '#fff',
        width: 50,
        height: 50,
        display: 'flex',
        borderRadius: '50%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    active: {
        background: theme.palette.primary.main,
        boxShadow: '0 4px 10px 0 #A68B03',
    },
    completed: {
        background: theme.palette.primary.main
    },
}));

const StepperIcon = props => {
    const classes = useStyle();
    const { active, completed } = props;

    const icons = {
        1: <ContactMail />,
        2: <LocalShipping />,
        3: <Payment />,
        4: <Payment />,
    };

    return (
        <div
            className={clsx(classes.root, {
                [classes.active]: active,
                [classes.completed]: completed,
            })}
        >
            {icons[String(props.icon)]}
        </div>
    );
}

StepperIcon.propTypes = {
    active: PropTypes.bool,
    completed: PropTypes.bool,
};

export default StepperIcon;