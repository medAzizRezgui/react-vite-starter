import { AuthProvider } from '@context/AuthProvider.tsx';
import { queryClient } from '@lib/react-query-client.ts';
import { QueryClientProvider } from '@tanstack/react-query';
import { NuqsAdapter } from 'nuqs/adapters/react';
import { RouterProvider } from 'react-router';

import { ThemeProvider } from '@/providers/theme-provider.tsx';
import AppRoutes from '@/routes';

export default function Providers() {
	return (
		<>
			<QueryClientProvider client={queryClient}>
				<AuthProvider>
					<ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
						<NuqsAdapter>
							<RouterProvider router={AppRoutes} />
						</NuqsAdapter>
					</ThemeProvider>
				</AuthProvider>
			</QueryClientProvider>
		</>
	);
}
