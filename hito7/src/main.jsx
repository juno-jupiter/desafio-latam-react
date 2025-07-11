import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";
import UserProvider from './context/UserContext.jsx';
import App from './App.jsx';

createRoot(document.getElementById('root')).render(
	<StrictMode>
		<BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
			<UserProvider>
				<App />
			</UserProvider>
		</BrowserRouter>
	</StrictMode>,
);
