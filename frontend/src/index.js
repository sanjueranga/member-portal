import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import { store } from './app/store';
import {disableReactDevTools} from '@fvilers/disable-react-devtools';
const root = ReactDOM.createRoot(document.getElementById('root'));
export const API_LINK = process.env.REACT_APP_API_URL;

if(process.env.NODE==='production') disableReactDevTools();

root.render(
	<React.StrictMode>
		<Provider store={store}>
			<App className="font-sans" />
		</Provider>
	</React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
