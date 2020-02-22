import React from 'react';
import { Marker } from 'react-map-gl';
import { PersonPinCircleTwoTone } from '@material-ui/icons';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        largeIcon: {
            width: 60,
            height: 60,
        },
    })
);

interface IPins {
    markers: any;
    onClickMarker: (city: any) => void;
}
export const Pins = ({ markers, onClickMarker }: IPins) => {
    console.log(markers);
    if (!markers.map) return null;
    const classes = useStyles();
    return markers.map((marker: any, index: number) => (
        <Marker key={`marker-${index}`} longitude={marker.markers.longitude} latitude={marker.markers.latitude}>
            <PersonPinCircleTwoTone
                className={classes.largeIcon}
                color="secondary"
                fontSize="large"
                onClick={() => onClickMarker(marker)}
            />
        </Marker>
    ));
};
