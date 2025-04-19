import Loadable from '@components/shared/Loaders/Loadable';
import { lazy } from 'react';

import { IRoute } from '@/MyTypes/interface/route';
import { RoleEnum } from '@MyTypes/enum/roles.ts';

const ExampleModulePage = Loadable(
	lazy(async () => await import('@modules/private/ExampleModule/index')),
);

const PRIVATE_ROTUES: IRoute[] = [
	{
		path: 'example-private-module',
		name: 'example-private-module',
		element: ExampleModulePage,
		roles: [RoleEnum.ADMIN],
		private: true,
	},
];

export default PRIVATE_ROTUES;
