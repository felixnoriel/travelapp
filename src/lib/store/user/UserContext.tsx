import React, { createContext } from 'react';
import { UserContextProps, FETCH_USER_DATA_INIT, FETCH_USER_DATA_SUCCESS, FETCH_USER_DATA_FAILURE, RESET_USER_DATA } from './UserTypes';

// creating a store/redux using hooks
export const UserStore = createContext({} as UserContextProps);
export const UserStoreProvider: React.SFC<{
    children: React.ReactNode,
    state: any,
    dispatch: any
}> = ({ children, state, dispatch }) => {
    const value = { state, dispatch };
    return (
        <UserStore.Provider value={value}>
            {children}
        </UserStore.Provider>
    )
}

export const userReducer = (state: any, action: any) => {
    switch (action.type) {
        case FETCH_USER_DATA_INIT:
            return {
                ...state,
                isLoading: true,
                isError: false
            };
        case FETCH_USER_DATA_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isError: false,
                user: action.payload.user
            };
        case FETCH_USER_DATA_FAILURE:
            return { ...state, isLoading: false, isError: true, error: action.error };
        case RESET_USER_DATA:
            return { ...state, user: null };
        default:
            throw new Error();
    }
};