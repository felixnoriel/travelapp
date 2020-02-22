import React, { useState } from 'react';
import { Marker } from 'react-map-gl';
import {
    Button,
    TextField,
    Card,
    CardContent,
    CardActions,
    Checkbox,
    FormControl,
    FormLabel,
    FormControlLabel,
} from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Add, Delete, PinDrop } from '@material-ui/icons';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        largeIcon: {
            width: 60,
            height: 60,
        },
        card: {
            minWidth: 200,
            float: 'right',
            zIndex: 10,
        },
    })
);

export const CreateMarker = ({ longitude, latitude, hideCreateMarker, addCreateMarker }: any) => {
    const [marketCoords, setMarkerCoords] = useState({ longitude: longitude, latitude: latitude });
    const [description, setDescription] = useState('');
    const [isPublic, setIsPublic] = useState(false);
    const classes = useStyles();

    const onMarkerDragStart = (event: any) => {
        // this._logDragEvent('onDragStart', event);
    };

    const onMarkerDrag = (event: any) => {
        // this._logDragEvent('onDrag', event);
    };

    const onMarkerDragEnd = (event: any) => {
        // this._logDragEvent('onDragEnd', event);
        setMarkerCoords({
            longitude: event.lngLat[0],
            latitude: event.lngLat[1],
        });
    };

    const Pin = () => {
        return <PinDrop color="secondary" fontSize="large" className={classes.largeIcon} />;
    };

    return (
        <Marker
            longitude={marketCoords.longitude}
            latitude={marketCoords.latitude}
            offsetTop={-20}
            offsetLeft={-10}
            draggable
            onDragStart={onMarkerDragStart}
            onDrag={onMarkerDrag}
            onDragEnd={onMarkerDragEnd}
        >
            <Pin />
            <Card className={classes.card}>
                <CardContent>
                    <FormControl>
                        <FormLabel component="legend">Details</FormLabel>
                        <TextField
                            placeholder="Description"
                            multiline
                            rows={2}
                            rowsMax={4}
                            variant="outlined"
                            onChange={e => setDescription(e.target.value)}
                        />
                        <FormControlLabel
                            control={
                                <Checkbox checked={isPublic} onChange={() => setIsPublic(!isPublic)} value={isPublic} />
                            }
                            label="Is public?"
                        />
                    </FormControl>
                </CardContent>
                <CardActions>
                    <Button
                        color="primary"
                        variant="contained"
                        size="small"
                        onClick={() =>
                            addCreateMarker({
                                longitude: marketCoords.longitude,
                                latitude: marketCoords.latitude,
                                description,
                                isPublic,
                            })
                        }
                    >
                        <Add />
                    </Button>
                    <Button size="small" variant="contained" color="secondary" onClick={() => hideCreateMarker()}>
                        <Delete />
                    </Button>
                </CardActions>
            </Card>
        </Marker>
    );
};
