import { useEffect, useState } from "react"
import { ThemeContext } from "./ThemeContext"

type Theme = "light" | "dark"

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
	const [theme, setTheme] = useState<Theme>(() => {
		const savedTheme = localStorage.getItem("theme") as Theme | null

		if (savedTheme) return savedTheme

		const prefersDark = window.matchMedia(
			"(prefers-color-scheme: dark)"
		).matches
		return prefersDark ? "dark" : "light"
	})

	useEffect(() => {
		document.documentElement.classList.remove("light", "dark")
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
