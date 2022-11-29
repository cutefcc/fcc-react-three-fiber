import { lazy, Suspense } from 'react';
import { Link, RouteObject, Outlet } from 'react-router-dom';
import Loading from '@components/Loading';
import Home from '@pages/Home';
import Flv from '@pages/Flv';
import Engine from '@pages/Engine';
import Cockpit from '@pages/Cockpit';
import Performance from '@pages/Performance';
import Avionics from '@pages/Avionics';
import Sound from '@pages/Sound';
import { Nothing, NothingText } from './style';
const Routes: RouteObject[] = [];
const Layout = () => (
  <div className="m-auto">
    <Suspense fallback={<Loading />}>
      <Outlet />
    </Suspense>
  </div>
);

function NoMatch() {
  return (
    <Nothing>
      <NothingText>Nothing to see here!</NothingText>
      <NothingText>
        <p>
          <Link to="/">Go to the home page</Link>
        </p>
      </NothingText>
    </Nothing>
  );
}

const mainRoutes = {
  path: '/',
  element: <Layout />,
  children: [
    { index: true, element: <Home /> },
    { path: '/loading', element: <Loading /> },
    { path: '/flv', element: <Flv /> },
    { path: '/engine', element: <Engine /> },
    { path: '/cockpit', element: <Cockpit /> },
    { path: '/performance', element: <Performance /> },
    { path: '/avionics', element: <Avionics /> },
    { path: '/sound', element: <Sound /> },
    { path: '*', element: <NoMatch /> },
  ],
};

Routes.push(mainRoutes);

export default Routes;
