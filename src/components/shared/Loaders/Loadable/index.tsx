import { ComponentType, JSX, Suspense } from 'react';

const Loadable =
	<P extends object>(Component: ComponentType<P>) =>
	(props: P): JSX.Element => (
		<Suspense
			fallback={
				<div
					className={
						'flex h-screen w-full items-center justify-center text-2xl'
					}>
					Loading Page ...
				</div>
			}>
			<Component {...props} />
		</Suspense>
	);

export default Loadable;
