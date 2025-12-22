import React from "react"
import ReactDOM from "react-dom/client"
import "./index.css"
import { ThemeProvider } from "./context/ThemeProvider"
import { RouterProvider } from "react-router-dom"
import { router } from "./routes/AppRoutes"
import { HabitProvider } from "./context/HabitContext"

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<ThemeProvider>
			<HabitProvider>
				<RouterProvider router={router} />
			</HabitProvider>
		</ThemeProvider>
	</React.StrictMode>
)
