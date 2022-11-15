import { useRoutes, BrowserRouter as Router } from 'react-router-dom';
import routes from '../routers';
const App = () => useRoutes(routes);

const AppWrapper = () => {
  return (
    <Router>
      <App />
    </Router>
  );
};
export default AppWrapper;
