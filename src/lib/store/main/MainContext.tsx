import React, { useReducer, createContext } from 'react'
import { SET_SNACKBAR, FS_SEARCH_COMPLETION } from './MainTypes';

const initialState = {
    snackbar: {
        open: false,
        severity: 'success',
        message: ''
    }
}

const reducer = (state: any, action: any) => {
    switch (action.type) {
        case SET_SNACKBAR:
            return {
                ...state,
                snackbar: {
                    ...action.snackbar
                }
            };
        case FS_SEARCH_COMPLETION:
            return {
                ...state,
                fsSearchCompletion: {
                    ...action.fsSearchCompletion
                }
            }
        default:
            return state;
    }
}

// creating a store/redux using hooks
export const MainStore = createContext({} as any);
export const MainStoreProvider: React.SFC<{}> = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const value = { state, dispatch };

    return (
        <MainStore.Provider value={value}>
            {children}
        </MainStore.Provider>
    )
}

