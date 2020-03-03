import React from 'react';
import { Marker } from 'react-map-gl';
import { PersonPinCircleTwoTone, Room } from '@material-ui/icons';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        largeIcon: {
            width: 60,
            height: 60,
        },
        smallIcon: {
            width: 30,
            height: 30,
        },
    })
);

interface IPins {
    markers: any;
    onClickMarker: (city: any) => void;
    type: string;
}
export const Pins = ({ markers, onClickMarker, type }: IPins) => {
    if (!markers || !markers.map) return null;
    const classes = useStyles();
    return markers.map((marker: any, index: number) => {
        let latitude = 0;
        let longitude = 0;
        if (type === 'user') {
            latitude = marker.markers.latitude
            longitude = marker.markers.longitude
        } else {
            latitude = marker.location.lat
            longitude = marker.location.lng
        }
        return (
            <Marker key={`marker-${index}`} longitude={longitude} latitude={latitude}>
                {
                    type === 'user'
                        ? <PersonPinCircleTwoTone
                            className={classes.largeIcon}
                            color="secondary"
                            fontSize="large"
                            onClick={() => onClickMarker(marker)}
                            />
                        : <Room
                            className={classes.smallIcon}
                            color="primary"
                            fontSize="large"
                            onClick={() => onClickMarker(marker)}
                            />
                }
                
            </Marker>
        )
    });
};