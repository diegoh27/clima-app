import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

import { CssBaseline } from "@mui/material";
import { SnackbarProvider } from "notistack";

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<CssBaseline />
		<SnackbarProvider>
			<App />
		</SnackbarProvider>
	</React.StrictMode>
);
