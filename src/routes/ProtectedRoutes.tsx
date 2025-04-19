import { DefaultLoader } from '@components/shared/Loaders/DefaultLoader/DefaultLoader.tsx';
import { AuthContext } from '@context/AuthContext.tsx';
import { RoleEnum } from '@MyTypes/enum/roles.ts';
import { IRoute } from '@MyTypes/interface/route.ts';
import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';

interface ProtectedRoutesProps {
	route: IRoute;
	roles: RoleEnum[] | null;
}

const ProtectedRoutes: React.FC<ProtectedRoutesProps> = ({ route, roles }) => {
	const authContext = useContext(AuthContext);

	if (!authContext) {
		return <DefaultLoader text={'Loading Authentication ...'} />; // or a fallback UI
	}

	const { isAuthenticated, user } = authContext;

	// Redirect to log in if not authenticated
	if (!isAuthenticated) {
		return <Navigate to='/login' replace />;
	}

	if (!user) {
		return <DefaultLoader text={'Loading User Data ...'} />;
	}

	// Check if the user has at least one of the required roles (if specified)
	if (roles && roles.length > 0) {
		const hasRequiredRole = roles.some(role => user?.roles.includes(role));
		if (!hasRequiredRole) {
			// Redirect to an unauthorized page or show a message
			return <Navigate to='/unauthorized' replace />;
		}
	}

	// Render the intended component if authenticated and authorized
	return React.createElement(route.element, { name: route.name });
};

export default ProtectedRoutes;
