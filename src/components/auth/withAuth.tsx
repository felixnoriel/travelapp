import React, { useEffect, useState, useReducer, createContext } from 'react';
import Amplify, { Auth, Hub } from 'aws-amplify';
import { useRouter } from 'next/router'
import { cognitoConfigAuth } from '../../../config';
import LoginPage from './login';
import RegisterPage from './register';
import { FETCH_USER_DATA_INIT, FETCH_USER_DATA_SUCCESS, FETCH_USER_DATA_FAILURE, RESET_USER_DATA } from '../store/user/UserTypes';
import { userReducer, UserStoreProvider } from '../store/user/UserContext';

Amplify.configure({
    Auth: cognitoConfigAuth
});

interface IWithAuth {
    children?: React.ReactNode
}
export const WithAuth: React.SFC<IWithAuth> = ({ children }) => {
    const router = useRouter();

    const {
        state,
        dispatch
    } = useAmplifyAuth();

    if (state.isLoading) {
        return null;
    }
    if (!state.user || state.isError) {
        if (router.route === '/account/register') {
            return <RegisterPage />;
        }
        return <LoginPage />;
    } else {
        if (router.route === '/account/register' || router.route === '/account/login') {
            // router.replace(router.route, '/', { shallow: true });
            router.push('/');
        }
    }

    if (children) {
        return (
            <UserStoreProvider state={state} dispatch={dispatch}>
                {children}
            </UserStoreProvider>
        )
    }

    return null;
}



const useAmplifyAuth = () => {
    const initialState = {
        isLoading: true,
        isError: false,
        user: null
    };
    const [state, dispatch] = useReducer(userReducer, initialState);
    const [triggerFetch, setTriggerFetch] = useState(false);

    useEffect(() => {
        let isMounted = true;
        console.log('useAmplifyAuth mounted');

        const fetchUserData = async () => {
            if (!isMounted) return;
            dispatch({ type: FETCH_USER_DATA_INIT });
            try {
                const data = await Auth.currentAuthenticatedUser();
                if (data) {
                    dispatch({
                        type: FETCH_USER_DATA_SUCCESS,
                        payload: { user: data }
                    });
                }
            } catch (error) {
                dispatch({ type: FETCH_USER_DATA_FAILURE, err: error });
            }
        };

        const HubListener = () => {
            Hub.listen("auth", data => {
                if (!isMounted) return;

                const { payload } = data;
                switch (payload.event) {
                    case "signIn":
                        setTriggerFetch(true);
                        console.log("signed in");
                        break;
                    case "signOut":
                        dispatch({ type: RESET_USER_DATA });
                        break;
                    default: return;
                }
            });
        };

        HubListener();
        fetchUserData();

        return () => {
            Hub.remove("auth", () => { });
            isMounted = false;
        };
    }, [triggerFetch]);

    return { state, dispatch };
};

export const federatedSignIn = (type: any) => {
    Auth.federatedSignIn({ provider: type })
}

export const loginHook = () => {
    const [response, setResponse] = useState({ success: false, err: '' });
    const signInTrigger = async (username: string, password: string) => {
        try {
            const data = await Auth.signIn(username, password);
            if (data && data.username) {
                setResponse({ err: '', success: true });
            }
        } catch (err) {
            setResponse({ err: err.message, success: false });
        }
    }

    return {
        response,
        signInTrigger
    };
}

export const signUpHook = () => {
    const [response, setResponse] = useState({ success: false, err: '' });
    const signUpTrigger = async (username: string, password: string) => {
        try {
            const data = await Auth.signUp({
                username,
                password,
                attributes: {
                    email: username,
                    name: username
                }
            });
            if (data && data.user) {
                setResponse({ err: '', success: true });
            }
        } catch (err) {
            setResponse({ err: err.message, success: false });
        }
    }

    return {
        response,
        signUpTrigger
    };
}