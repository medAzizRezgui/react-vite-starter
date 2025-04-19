import { motion } from 'framer-motion';
import { Outlet } from 'react-router-dom';

const PrivateLayout = () => {
	return (
		<>
			<header className='flex h-20 shrink-0 items-center gap-2'>
				<div className='mr-8 ml-auto flex flex-col items-end gap-x-2'>
					<h1 className={'text-lg'}>Good Afternoon, User.</h1>
					<p>02 May, 12:23:30 PM</p>
				</div>
			</header>
			<div className='flex h-full w-full flex-col'>
				<main className='w-full px-7'>
					<motion.div
						style={{
							height: '100vh',
						}}
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={{ duration: 1 }}>
						<Outlet />
					</motion.div>
				</main>
			</div>
		</>
	);
};

export default PrivateLayout;
