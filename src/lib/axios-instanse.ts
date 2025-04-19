// axiosInstance.ts
import axios from 'axios';

const axiosInstance = axios.create({
	baseURL: import.meta.env.VITE_BACKEND_URL, // Use VITE_BACKEND_URL from environment variables
	withCredentials: true, // send cookies with every request
});

// Response interceptor to handle token refresh
axiosInstance.interceptors.response.use(
	response => response,
	async error => {
		const originalRequest = error.config;
		// Prevent infinite loop by marking the request and skipping refresh token request
		if (
			error.response?.status === 401 &&
			!originalRequest._retry &&
			!originalRequest.url.includes('/refresh')
		) {
			originalRequest._retry = true;
			try {
				// Attempt to refresh token using axiosInstance
				await axiosInstance.get('/refresh');
				// Retry the original request after refreshing
				return axiosInstance(originalRequest);
			} catch (_error) {
				//logoutCleanup(queryClient); // 💥 now clean and modular
				// If refresh fails, forward error for further handling
				return Promise.reject(_error);
			}
		}
		return Promise.reject(error);
	},
);

export default axiosInstance;
