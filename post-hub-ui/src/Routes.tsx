import React from 'react';
import { RouteObject, useRoutes } from 'react-router-dom';
import PostsUser from './pages/Postsuser';
import Homepage from './pages/Homepage';

interface RouteElementProps {
  params: {
    userId: string;
  };
}

const AppRoutes: React.FC = () => {
  const routes: RouteObject[] = [
    {
      path: '/',
      element: <Homepage />,
    },
    {
      path: '/userPost/:userId',
      element: <PostsUser />,
    },
  ];

  return useRoutes(routes);
};

export default AppRoutes;
