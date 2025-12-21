import React from "react"
import ReactDOM from "react-dom/client"
import "./index.css"
import { ThemeProvider } from "./context/ThemeProvider"
import { RouterProvider } from "react-router-dom"
import { router } from "./routes/AppRoutes"

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<ThemeProvider>
			<RouterProvider router={router} />
		</ThemeProvider>
	</React.StrictMode>
)
