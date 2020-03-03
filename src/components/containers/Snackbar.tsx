import React, { useContext } from 'react';
import { MainStore } from '../../lib/store/main/MainContext';
import { SET_SNACKBAR } from '../../lib/store/main/MainTypes';
import { Snackbar } from '@material-ui/core';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import { makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        width: '100%',
        '& > * + *': {
            marginTop: theme.spacing(2),
        },
    },
}));

export const SnackbarAlert = () => {
    const { state, dispatch } = useContext(MainStore);
    const classes = useStyles();

    const closeSnackbar = (event?: React.SyntheticEvent, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        dispatch({
            type: SET_SNACKBAR,
            open: false
        })
    }

    const Alert = (props: AlertProps) => {
        return (
            <MuiAlert elevation={6} variant="filled" {...props} />
        );
    }

    return (
        <div className={classes.root}>
            <Snackbar
                open={state.snackbar.open}
                autoHideDuration={2000}
                onClose={closeSnackbar}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <Alert onClose={closeSnackbar} severity={state.snackbar.severity}>
                    {
                        state.snackbar.message
                    }
                </Alert>
            </Snackbar>
        </div>
    );
}