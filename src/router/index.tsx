import { RouteObject } from 'react-router-dom';
import Home from '@/pages/Home';

const routes: RouteObject[] = [
  {
    path: '/',
    children: [
      {
        index: true,
        element: <Home />,
      },

      //   {
      //     path: '*',
      //     element: <NotFound />,
      //   },
    ],
  },
];

export default routes;
