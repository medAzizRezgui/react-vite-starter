import Loadable from '@components/shared/Loaders/Loadable';
import { lazy } from 'react';

import { IRoute } from '@/MyTypes/interface/route';

const Login = Loadable(
	lazy(async () => await import('@modules/public/Login/index')),
);
const PUPLIC_ROTUES: IRoute[] = [
	{
		path: 'login',
		name: 'login',
		element: Login,
		roles: [],
		private: false,
	},
];

export default PUPLIC_ROTUES;
