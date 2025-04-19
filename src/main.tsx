import { worker } from '@lib/mocks/browser.ts';
import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root')!);

if (import.meta.env.NODE_ENV === 'test') {
	worker.start().then(() => {
		root.render(
			<StrictMode>
				<App />
			</StrictMode>,
		);
	});
} else {
	root.render(
		<StrictMode>
			<App />
		</StrictMode>,
	);
}
