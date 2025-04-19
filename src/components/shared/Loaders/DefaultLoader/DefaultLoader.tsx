import React from 'react';

interface DefaultLoaderProps {
	text?: string;
}
const DefaultLoader: React.FC<DefaultLoaderProps> = ({ text }) => {
	return (
		<div
			className={'flex h-screen w-full items-center justify-center text-2xl'}>
			{text ?? 'Loading State ...'}
		</div>
	);
};
export { DefaultLoader };
