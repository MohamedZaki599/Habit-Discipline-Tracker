import ThemeContext from "@/context/ThemeContext"
import { Button } from "@/components/ui/button"

export default function Navbar() {
	return (
		<ThemeContext.Consumer>
			{({ theme, toggleTheme }) => (
				<div className="p-4 flex gap-3">
					<span>Current Theme: {theme}</span>
					<Button onClick={toggleTheme}>Toggle Theme</Button>
				</div>
			)}
		</ThemeContext.Consumer>
	)
}
