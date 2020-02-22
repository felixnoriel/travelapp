import { Dispatch, ReactNode } from 'react';

export interface IUserState {
    user: any;
}

export interface IAction {
    [key: string]: any;
}

export interface UserContextProps {
    state: IUserState;
    dispatch: Dispatch<IAction>;
}

export interface IProviderProps {
    children: ReactNode
}

export const FETCH_USER_DATA_INIT = 'FETCH_USER_DATA_INIT';
export const FETCH_USER_DATA_SUCCESS = 'FETCH_USER_DATA_SUCCESS';
export const FETCH_USER_DATA_FAILURE = 'FETCH_USER_DATA_FAILURE';
export const RESET_USER_DATA = 'USER_SIGNOUT';