import Loader from './component/loader/loader';
import { useCurrentUser } from './hooks/useCurrentUser';
import Navigator from './routes';
import { useAuthStore } from './store/auth';

const App = () => {
  const { loading } = useAuthStore((state) => state);
  useCurrentUser();

  if (loading) {
    return <Loader />;
  }
  return <Navigator />;
};

export default App;
