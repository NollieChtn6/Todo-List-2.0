import App from "./App.tsx";

import React from "react";

import ReactDOM from "react-dom/client";

import { PrimeReactProvider } from "primereact/api";
import "./index.css";
import "primereact/resources/themes/md-light-indigo/theme.css";
import "primeicons/primeicons.css";

// https://www.codingdeft.com/posts/react-18-typescript-error/
const rootElement = document.getElementById("root");

const root = ReactDOM.createRoot(rootElement as HTMLElement);
root.render(
	<React.StrictMode>
		<PrimeReactProvider>
			<App />
		</PrimeReactProvider>
	</React.StrictMode>,
);
