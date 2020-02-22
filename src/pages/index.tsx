import Dashboard from '../components/dashboard';
import { WithAuth } from '../components/auth/withAuth';

export default () => (
	<WithAuth>
		<Dashboard />
	</WithAuth>
);