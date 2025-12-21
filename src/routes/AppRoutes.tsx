import { createBrowserRouter } from "react-router-dom"
import AppLayout from "@/layouts/AppLayout"
import Dashboard from "@/pages/Dashboard"
import Habits from "@/pages/Habits"
import Analytics from "@/pages/Analytics"
import Settings from "@/pages/Settings"

export const router = createBrowserRouter([
	{
		path: "/",
		element: <AppLayout />,
		children: [
			{ index: true, element: <Dashboard /> },
			{ path: "habits", element: <Habits /> },
			{ path: "analytics", element: <Analytics /> },
			{ path: "settings", element: <Settings /> },
		],
	},
])
