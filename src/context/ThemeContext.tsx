import { createContext, useEffect, useState } from "react"

type Theme = "light" | "dark"

type ThemeContextType = {
	theme: Theme
	toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextType>({
	theme: "light",
	toggleTheme: () => {},
})

export default ThemeContext

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
	const [theme, setTheme] = useState<Theme>(
		() =>
			(localStorage.getItem("theme") as Theme) ||
			(window.matchMedia("(prefers-color-scheme: dark)").matches
				? "dark"
				: "light")
	)

	useEffect(() => {
		document.documentElement.className = ""
		document.documentElement.classList.add(theme)
		localStorage.setItem("theme", theme)
	}, [theme])

	const toggleTheme = () =>
		setTheme((prev) => (prev === "light" ? "dark" : "light"))

	return (
		<ThemeContext.Provider value={{ theme, toggleTheme }}>
			{children}
		</ThemeContext.Provider>
	)
}
