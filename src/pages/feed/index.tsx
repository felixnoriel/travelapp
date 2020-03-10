import Feed from '../../components/feed';
import { WithAuth } from '../../components/auth/withAuth';

export default () => (
	<WithAuth>
		<Feed />
	</WithAuth>
);