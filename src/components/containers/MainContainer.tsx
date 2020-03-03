import React from 'react';
import Header from './Header';
import Footer from './Footer';
import { MainStoreProvider } from '../../lib/store/main/MainContext';
import { SnackbarAlert } from './Snackbar';
import { CssBaseline } from '@material-ui/core';

interface IMainContainer {
    children: React.ReactNode;
}

const MainContainer: React.SFC<IMainContainer> = ({ children }) => {
    return (
        <MainStoreProvider>
            <CssBaseline />
            <SnackbarAlert />
            <Header />
            {children}
            <Footer />
        </MainStoreProvider>
    );
};

export default MainContainer;
