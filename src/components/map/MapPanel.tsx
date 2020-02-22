import { useContext, useMemo } from 'react';
import { MapStore } from '../store/map/MapContext';
import { FlyToInterpolator } from 'react-map-gl';
import { SET_VIEW_PORT } from '../store/map/MapTypes';
import { List, ListItem, ListItemText, Divider } from '@material-ui/core';

export const MapPanel = () => {
    const {
        state: { markers: storeMapMarkers },
        dispatch: mapDispatch,
    } = useContext(MapStore);

    const markerClick = (marker: any) => {
        mapDispatch({
            type: SET_VIEW_PORT,
            viewPort: {
                longitude: marker.markers.longitude,
                latitude: marker.markers.latitude,
                transitionInterpolator: new FlyToInterpolator({ speed: 1.2 }),
                transitionDuration: 'auto',
            },
        });
    };
    const MemoRenderPanel = useMemo(
        () => (
            <List>
                <h3>List - click an item to navigate</h3>
                {storeMapMarkers.map((marker: any, index: number) => (
                    <ListItem button key={marker.id} onClick={() => markerClick(marker)}>
                        <p>
                            {marker.username} - {marker.description}
                        </p>
                    </ListItem>
                ))}
            </List>
        ),
        [storeMapMarkers]
    );

    return <div>{MemoRenderPanel}</div>;
};
