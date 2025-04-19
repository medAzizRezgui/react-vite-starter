import { DefaultLoader } from '@components/shared/Loaders/DefaultLoader/DefaultLoader.tsx';
import axiosInstance from '@lib/axios-instanse.ts';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import React, { useCallback, useEffect } from 'react';

import { AuthContext } from './AuthContext.tsx';

export interface User {
	id: string;
	email: string;
	roles: string[];
}

const fetchUser = async (): Promise<User | null> => {
	try {
		const response = await axiosInstance.get('/me');
		return response.data.user;
	} catch {
		return null;
	}
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const queryClient = useQueryClient();

	const {
		data: user,
		isLoading,
		refetch: refetchUser,
	} = useQuery({
		queryKey: ['auth', 'user'],
		queryFn: fetchUser,
		retry: false,
		refetchOnWindowFocus: false,
	});

	// Optionally, refetch user on mount
	useEffect(() => {
		void refetchUser();
	}, [refetchUser]);

	const login = useCallback(
		async (credentials: {
			email: string;
			password: string;
		}): Promise<User | null | undefined> => {
			await axiosInstance.post('/login', credentials);
			// Wait for the auth state to update
			const result = await refetchUser();
			return result.data;
		},
		[refetchUser],
	);

	const logout = useCallback(async () => {
		await axiosInstance.post('/logout');
		queryClient.setQueryData(['auth', 'user'], null);
	}, [queryClient]);

	const refresh = useCallback(async () => {
		try {
			await axiosInstance.get('/refresh');
			await refetchUser();
		} catch {
			queryClient.setQueryData(['auth', 'user'], null);
		}
	}, [refetchUser, queryClient]);

	if (isLoading) {
		return <DefaultLoader text={'Loading Authentication ...'} />;
	}

	return (
		<AuthContext.Provider
			value={{ user, isAuthenticated: !!user, login, logout, refresh }}>
			{children}
		</AuthContext.Provider>
	);
};
