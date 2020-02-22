import React, { useState, useContext, useRef, useEffect, useMemo } from 'react';
import ReactMapGL, { NavigationControl, GeolocateControl, Popup } from 'react-map-gl';
import { Button } from '@material-ui/core';
import { Add } from '@material-ui/icons';
import { MAPBOX_PUBLIC_API_KEY, REST_API_URL } from '../../../config';
import { MapStore } from '../store/map/MapContext';
import { UserStore } from '../store/user/UserContext';
import { MainStore } from '../store/main/MainContext';
import { SET_VIEW_PORT, SET_MARKERS } from '../store/map/MapTypes';
import { SET_SNACKBAR } from '../store/main/MainTypes';
import { CreateMarker } from './CreateMarker';
import { Pins } from './ListMarker';

import 'mapbox-gl/dist/mapbox-gl.css';

export const Map = () => {
    const {
        state: { viewPort: storeMapViewPort, markers: storeMapMarkers },
        dispatch: mapDispatch,
    } = useContext(MapStore);
    const { state: userState } = useContext(UserStore);
    const { dispatch: mainDispatch } = useContext(MainStore);

    const [showCreateMarker, setShowCreateMarker] = useState(false);
    const [showPopup, setShowPopup] = useState(false);
    const [popupValues, setPopupValues] = useState({
        name: '',
        latitude: 0,
        longitude: 0,
        description: '',
    });
    // const [markers, setMarkers] = useState([]);

    const mapRef = useRef();

    useEffect(() => {
        let mounted = true;
        const fetchMarkers = async () => {
            if (!mounted) return;
            const response = await fetch(REST_API_URL);
            const responseJSON = await response.json();
            mapDispatch({
                type: SET_MARKERS,
                markers: responseJSON,
            });
        };

        fetchMarkers();
        return () => {
            mounted = false;
        };
    }, []);

    const dispatchViewPort = (value: any) => {
        mapDispatch({
            type: SET_VIEW_PORT,
            viewPort: {
                ...value,
            },
        });
    };

    const setRef = (ref: any) => {
        if (!ref) return;
        mapRef.current = ref;
    };

    const showPopUpDetails = (e: any) => {
        if (!mapRef || !mapRef.current) return;
        const features = (mapRef.current as any).queryRenderedFeatures(e.point);
        let foundFeature = false;
        features.map(function(feat: any) {
            if (feat && feat.id > 0 && feat.properties && feat.properties.name) {
                const name = feat.properties.name_en ? feat.properties.name_en : feat.properties.name;
                console.log(feat);
                setPopupValues({
                    name,
                    longitude: feat.geometry.coordinates[0],
                    latitude: feat.geometry.coordinates[1],
                    description: '',
                });
                setShowPopup(true);
                foundFeature = true;
            }
        });
        if (!foundFeature) {
            setShowPopup(false);
        }
    };

    const showAddMarker = (show: boolean) => {
        setShowCreateMarker(show);
    };

    const addCreateMarker = ({ longitude, latitude, description, isPublic }: any) => {
        const createMarkerAPI = async () => {
            try {
                const username = userState.user.attributes.email;
                const markerData: any = {
                    username,
                    markers: {
                        longitude,
                        latitude,
                    },
                    description,
                    isPublic,
                };
                const response = await fetch(REST_API_URL, {
                    method: 'post',
                    body: JSON.stringify(markerData),
                });
                mapDispatch({
                    type: SET_MARKERS,
                    markers: storeMapMarkers.concat(markerData),
                });

                const responseJSON = await response.json();
                console.log('createMarkerAPI response', responseJSON);
                // alert('successfully added a marker!');
                showAddMarker(false);
                mainDispatch({
                    type: SET_SNACKBAR,
                    snackbar: {
                        severity: 'success',
                        message: 'Successfully added a mark!',
                        open: true,
                    },
                });
            } catch (err) {
                mainDispatch({
                    type: SET_SNACKBAR,
                    snackbar: {
                        severity: 'error',
                        message: 'Failed to add a mark: ' + err.message,
                        open: true,
                    },
                });
                // alert('Failed to add a marker:' + err.message);
                console.log('err post create marker', err);
            }
        };
        createMarkerAPI();
        console.log('ADDING', longitude, latitude);
    };

    const MemoRenderPins = useMemo(
        () => (
            <Pins
                markers={storeMapMarkers}
                onClickMarker={marker => {
                    console.log({
                        latitude: marker.markers.latitude,
                        longitude: marker.markers.longitude,
                        name: marker.username,
                        description: marker.description,
                    });
                    setShowPopup(true);
                    setPopupValues({
                        latitude: marker.markers.latitude,
                        longitude: marker.markers.longitude,
                        name: marker.username,
                        description: marker.description,
                    });
                }}
            />
        ),
        [storeMapMarkers]
    );

    const MemoRenderCreateMarker = useMemo(
        () => (
            <CreateMarker
                latitude={storeMapViewPort.latitude}
                longitude={storeMapViewPort.longitude}
                hideCreateMarker={() => setShowCreateMarker(false)}
                addCreateMarker={(params: any) => addCreateMarker(params)}
            />
        ),
        [showCreateMarker]
    );

    return (
        <ReactMapGL
            {...storeMapViewPort}
            onViewportChange={(value: any) => dispatchViewPort(value)}
            mapboxApiAccessToken={MAPBOX_PUBLIC_API_KEY}
            mapStyle="mapbox://styles/felixnoriel/ck6vlqwcw0o2z1jqvylhi32jr?optimize=true"
            ref={ref => setRef(ref)}
            onClick={(e: any) => showPopUpDetails(e)}
            width={'100%'}
            height={'85vh'}
        >
            {showPopup && (
                <Popup
                    latitude={popupValues.latitude}
                    longitude={popupValues.longitude}
                    closeButton={true}
                    closeOnClick={false}
                    onClose={() => setShowPopup(false)}
                    anchor="top"
                >
                    <p>{popupValues.name}</p>
                    <p>{popupValues.description}</p>
                </Popup>
            )}

            {showCreateMarker && MemoRenderCreateMarker}
            {MemoRenderPins}
            <div style={{ position: 'absolute', right: 0, top: 40 }}>
                <NavigationControl />
                <GeolocateControl positionOptions={{ enableHighAccuracy: true }} trackUserLocation={true} />
            </div>
            <div style={{ position: 'absolute', right: 0 }}>
                <Button
                    className="map-add-marker"
                    variant="contained"
                    color="primary"
                    startIcon={<Add />}
                    onClick={() => showAddMarker(true)}
                >
                    ADD A MARKER
                </Button>
            </div>
        </ReactMapGL>
    );
};
