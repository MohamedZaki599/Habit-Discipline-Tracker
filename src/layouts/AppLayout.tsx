import { Link, Outlet } from "react-router-dom"

export default function AppLayout() {
	return (
		<div className="min-h-screen bg-background text-foreground">
			{/* Navbar */}
			<header className="border-b p-4">
				<h1 className="text-lg font-semibold">Habit & Discipline Tracker</h1>
			</header>

			{/* Main Content */}
			<main className="p-4 pb-20">
				<Outlet />
			</main>

			{/* Bottom Navigation (Mobile) */}
			<footer className="fixed bottom-0 left-0 right-0 border-t bg-background">
				<nav className="grid grid-cols-4 text-sm">
					<Link to="/" className="p-3 text-center">
						Dashboard
					</Link>
					<Link to="/habits" className="p-3 text-center">
						Habits
					</Link>
					<Link to="/analytics" className="p-3 text-center">
						Analytics
					</Link>
					<Link to="/settings" className="p-3 text-center">
						Settings
					</Link>
				</nav>
			</footer>
		</div>
	)
}
