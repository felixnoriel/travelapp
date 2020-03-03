import React, { useReducer, createContext } from 'react';
import { SET_SEARCH, SET_VIEW_PORT, SET_MARKERS, SET_VENUES } from './MapTypes';

const initialState = {
    searchCoordinates: {},
    viewPort: {
        width: '90%',
        height: '80vh',
        longitude: 151.2093,
        latitude: -33.8688,
        zoom: 14,
    },
    markers: [],
};

const reducer = (state: any, action: any) => {
    switch (action.type) {
        case SET_SEARCH:
            return {
                ...state,
                searchCoordinates: action.searchCoordinates,
                viewPort: {
                    ...state.viewPort,
                    latitude: action.searchCoordinates.center[1],
                    longitude: action.searchCoordinates.center[0],
                },
            };
        case SET_VIEW_PORT:
            return {
                ...state,
                viewPort: {
                    ...state.viewPort,
                    ...action.viewPort,
                },
            };
        case SET_MARKERS:
            return {
                ...state,
                markers: action.markers,
            };
        case SET_VENUES:
            return {
                ...state,
                venues: action.venues.response.venues
            }
        default:
            return state;
    }
};

// creating a store/redux using hooks
export const MapStore = createContext({} as any);
export const MapStoreProvider: React.SFC<{}> = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const value = { state, dispatch };

    return <MapStore.Provider value={value}>{children}</MapStore.Provider>;
};
