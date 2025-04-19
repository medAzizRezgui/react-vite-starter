import Unauthorized from '@components/shared/Unauthorized/Unauthorized.tsx';
import React from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import NotFound from 'src/components/shared/NotFound';

import PrivateLayout from '@/layout/PrivateLayout';
import PublicLayout from '@/layout/PublicLayout';
import { IRoute } from '@/MyTypes/interface/route';

import ProtectedRoute from './ProtectedRoutes';
import GLOBAL_ROUTES from './routes';

const renderRoutes = (
	routes: IRoute[],
): { path: string; element: React.JSX.Element }[] => {
	return routes.map(route => ({
		path: route.path,
		element: route.private ? (
			<ProtectedRoute route={route} roles={route.roles} />
		) : (
			<route.element name={route.name} />
		),
	}));
};

const AppRoutes = createBrowserRouter([
	{
		path: '/private/*',
		element: <PrivateLayout />,
		children: [
			{
				index: true,
				element: <Navigate to={'dashboard'} replace />,
			},
			...renderRoutes(GLOBAL_ROUTES.PRIVATE_ROUTES),
		],
	},
	{
		path: '/*',
		element: <PublicLayout />,
		children: [
			{
				index: true,
				element: <Navigate to='login' replace />,
			},
			...renderRoutes(GLOBAL_ROUTES.PUBLIC_ROUTES),
		],
	},
	{ path: '/unauthorized', element: <Unauthorized /> },

	{ path: '*', element: <NotFound /> },
]);

export default AppRoutes;
