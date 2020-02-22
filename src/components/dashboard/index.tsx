import React from 'react';
import MainContainer from '../containers/MainContainer';
import { RootMap } from '../map/RootMap';

const Dashboard: React.SFC<{}> = () => {

    return (
        <MainContainer>
            <RootMap />
        </MainContainer>
    )
}

export default Dashboard;