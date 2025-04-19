import { RoleEnum } from '@MyTypes/enum/roles';
import { ComponentType } from 'react';

export interface RouteComponentProps {
	name: string;
}

export interface IRoute {
	path: string;
	element: ComponentType<RouteComponentProps>;
	name: string;
	roles: RoleEnum[] | null;
	private?: boolean;
}
