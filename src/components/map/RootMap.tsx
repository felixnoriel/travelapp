import { Container, Grid } from '@material-ui/core';
import './rootmap.scss';
import { Map } from './Map';
import { Search } from './Search';
import { MapStoreProvider } from '../store/map/MapContext';
import { MapPanel } from './MapPanel';
import { Drawer } from '@material-ui/core';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';

const drawerWidth = 350;

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
        },
        appBar: {
            width: `calc(100% - ${drawerWidth}px)`,
            marginRight: drawerWidth,
        },
        drawer: {
            width: drawerWidth,
            flexShrink: 0,
        },
        drawerPaper: {
            width: drawerWidth,
            top: 'auto',
        },
        toolbar: theme.mixins.toolbar,
        content: {
            flexGrow: 1,
            backgroundColor: theme.palette.background.default,
            padding: theme.spacing(3),
        },
    })
);

export const RootMap = () => {
    const classes = useStyles();
    return (
        <MapStoreProvider>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Drawer
                        className={classes.drawer}
                        variant="permanent"
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                        anchor="right"
                    >
                        <MapPanel />
                    </Drawer>
                </Grid>
                <Grid item xs={12}>
                    <div className={classes.appBar}>
                        <Search />
                        <Map />
                    </div>
                </Grid>
            </Grid>
        </MapStoreProvider>
    );
};
