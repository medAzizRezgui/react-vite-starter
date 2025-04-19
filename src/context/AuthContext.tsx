import { User } from '@context/AuthProvider.tsx';
import { createContext } from 'react';

interface AuthContextType {
	user: User | null | undefined;
	isAuthenticated: boolean;
	login: (credentials: {
		email: string;
		password: string;
	}) => Promise<User | null | undefined>;
	logout: () => Promise<void>;
	refresh: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | null>(null);
