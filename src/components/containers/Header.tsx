import { Auth } from 'aws-amplify';
import { AppBar, Button, Toolbar, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    '@global': {
        ul: {
            margin: 0,
            padding: 0,
            listStyle: 'none',
        },
    },
    appBar: {
        borderBottom: `1px solid ${theme.palette.divider}`,
    },
    toolbar: {
        flexWrap: 'wrap',
    },
    toolbarTitle: {
        flexGrow: 1,
    },
    link: {
        margin: theme.spacing(1, 1.5),
    },
}));

const Header = () => {
    const classes = useStyles();
    return (
        <AppBar position="static" color="default" elevation={0} className={classes.appBar}>
            <Toolbar className={classes.toolbar}>
                <Typography variant="h6" color="inherit" noWrap className={classes.toolbarTitle}>
                    Company
                </Typography>
                {/* <nav>
                <Link variant="button" color="textPrimary" href="#" className={classes.link}>
                Features
                </Link>
                <Link variant="button" color="textPrimary" href="#" className={classes.link}>
                Enterprise
                </Link>
                <Link variant="button" color="textPrimary" href="#" className={classes.link}>
                Support
                </Link>
            </nav> */}
                <Button
                    onClick={() => Auth.signOut()}
                    href="#"
                    color="primary"
                    variant="outlined"
                    className={classes.link}
                >
                    Logout
                </Button>
            </Toolbar>
        </AppBar>
    );
};

export default Header;
