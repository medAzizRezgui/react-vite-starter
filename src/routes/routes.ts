import PRIVATE_ROTUES from '@/modules/private/routes';
import PUPLIC_ROTUES from '@/modules/public/routes';
import { IRoute } from '@/MyTypes/interface/route';

const GLOBAL_ROUTES: {
	PUBLIC_ROUTES: IRoute[];
	PRIVATE_ROUTES: IRoute[];
} = {
	PUBLIC_ROUTES: [...PUPLIC_ROTUES],
	PRIVATE_ROUTES: [...PRIVATE_ROTUES],
};

export default GLOBAL_ROUTES;
