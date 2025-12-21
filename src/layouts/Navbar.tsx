import { useTheme } from "@/context/ThemeContext"
import { Button } from "@/components/ui/button"

export default function Navbar() {
	const { theme, toggleTheme } = useTheme()

	return (
		<div className="p-4 flex gap-3">
			<span>Current Theme: {theme}</span>
			<Button onClick={toggleTheme}>Toggle Theme</Button>
		</div>
	)
}
