import { MainLayout } from '@/layouts/Main';

import { Navigate, type RouteObject } from 'react-router-dom';

const getRoutesData = (): RouteObject[] => [
  {
    element: <MainLayout />,
    children: [
      {
        index: true,
        async lazy() {
          const { View } = await import('@/pages/Home');

          return { Component: View };
        }
      }
    ]
  },
  {
    path: '*',
    element: <Navigate to="/" />
  }
];

export default getRoutesData;
