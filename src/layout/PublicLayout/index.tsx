import { motion } from 'framer-motion';
import { JSX } from 'react';
import { Outlet } from 'react-router-dom';
const PublicLayout = (): JSX.Element => {
	return (
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
	);
};

export default PublicLayout;
