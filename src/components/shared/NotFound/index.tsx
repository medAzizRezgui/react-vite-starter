import { useNavigate } from 'react-router-dom';

import { Button } from '../../ui/button.tsx';

const NotFound = () => {
	const navigate = useNavigate();
	return (
		<div className='mx-auto max-w-screen-xl px-4 py-8 lg:px-6 lg:py-16'>
			<div className='mx-auto max-w-screen-sm text-center'>
				<h1 className='text-primary-600 dark:text-primary-500 mb-4 text-7xl font-extrabold tracking-tight lg:text-9xl'>
					404
				</h1>
				<p className='mb-4 text-3xl font-bold tracking-tight text-gray-900 md:text-4xl dark:text-white'>
					Something's missing.
				</p>
				<p className='mb-4 text-lg font-light text-gray-500 dark:text-gray-400'>
					Sorry, we can't find that page. You'll find lots to explore on the
					home page.{' '}
				</p>
				<Button variant={'link'} onClick={() => navigate('/public/login')}>
					Back to Homepage
				</Button>
			</div>
		</div>
	);
};

export default NotFound;
