import { RoleEnum } from '@MyTypes/enum/roles.ts';
import { http, HttpResponse } from 'msw';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

let isLoggedIn = false;

interface LoginRequestBody {
	email: string;
	password: string;
}

interface IAny {
	[key: string]: string;
}

export const handlers = [
	//* Simulate login
	http.post<IAny, LoginRequestBody, IAny>(
		`${BACKEND_URL}/login`,
		async ({ request }) => {
			const body = await request.json();
			const { email, password } = body;
			if (
				(email === 'admin@example.com' || email === 'superadmin@example.com') &&
				password === '123456'
			) {
				isLoggedIn = true;
				const h = new Headers();
				h.append('Set-Cookie', 'refreshToken=fake-refresh; HttpOnly; Path=/');
				h.append('Set-Cookie', 'accessToken=fake-access; HttpOnly; Path=/');
				return new HttpResponse(null, {
					status: 200,
					headers: h,
				});
			}
			return HttpResponse.json(
				{ error: 'Invalid credentials' },
				{ status: 401 },
			);
		},
	),

	//* Simulate fetching user
	http.get(`${BACKEND_URL}/me`, ({ cookies }) => {
		if (!cookies.accessToken || !isLoggedIn) {
			return new HttpResponse(null, { status: 401 });
		}

		return HttpResponse.json({
			user: {
				id: '1',
				email: 'admin@example.com',
				roles: RoleEnum.SUPER_ADMIN,
			},
		});
	}),

	//* Simulate refreshing token
	http.get(`${BACKEND_URL}/refresh`, ({ cookies }) => {
		const refreshToken = cookies.refreshToken;
		if (refreshToken === 'fake-refresh') {
			// Issue a new access token
			return new HttpResponse(null, {
				status: 200,
				headers: {
					'Set-Cookie': 'accessToken=fake-access; HttpOnly; Path=/',
				},
			});
		}
		// Invalid/missing refresh token
		return new HttpResponse(
			JSON.stringify({ message: 'the refresh token is missing or malformed' }),
			{ status: 401 },
		);
	}),

	//* Simulate a protected /data route
	http.get(`${BACKEND_URL}/data`, ({ cookies }) => {
		if (cookies.accessToken !== 'fake-access') {
			return new HttpResponse(null, { status: 401 });
		}

		// Example protected data
		return HttpResponse.json({
			message: 'Here is your secret data 👀',
			data: {
				stats: [1, 2, 3],
				username: 'admin@example.com',
			},
		});
	}),

	//* Protected route: /data
	// http.get(`${BACKEND_URL}/data`, ({ cookies }) => {
	// 	const token = cookies.accessToken;
	//
	// 	if (!token || token === 'expired-token') {
	// 		return new HttpResponse(null, { status: 401 });
	// 	}
	//
	// 	// Valid token case
	// 	return HttpResponse.json({
	// 		message: 'Here is your secret data 👀',
	// 		data: {
	// 			stats: [1, 2, 3],
	// 			username: 'admin@example.com',
	// 		},
	// 	});
	// }),

	//* Simulate logout
	http.post(`${BACKEND_URL}/logout`, () => {
		isLoggedIn = false;
		return new HttpResponse(null, {
			status: 200,
			headers: {
				'Set-Cookie': [
					'accessToken=; Max-Age=0; Path=/',
					'refreshToken=; Max-Age=0; Path=/',
				].join(', '),
			},
		});
	}),
];
