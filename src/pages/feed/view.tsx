import ViewFeed from '../../components/feed/view';
import { WithAuth } from '../../components/auth/withAuth';
import MainContainer from '../../components/containers/MainContainer';

export default () => (
	<WithAuth>
    <MainContainer>
      <ViewFeed />
    </MainContainer>
	</WithAuth>
);