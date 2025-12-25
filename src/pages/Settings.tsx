import { useTheme } from "@/context/ThemeContext"
import { useHabits } from "@/context/HabitContext"
import { useState } from "react"

export default function SettingsPage() {
	const { theme, toggleTheme } = useTheme()
	const { habits, logs, streaks } = useHabits()

	const [importError, setImportError] = useState("")

	// ---------------- Export Data ----------------
	const handleExport = () => {
		const data = {
			habits,
			logs,
			streaks,
		}

		const blob = new Blob([JSON.stringify(data, null, 2)], {
			type: "application/json",
		})

		const url = URL.createObjectURL(blob)
		const a = document.createElement("a")
		a.href = url
		a.download = "habit-tracker-backup.json"
		a.click()
	}

	// ---------------- Import Data ----------------
	const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0]
		if (!file) return

		const reader = new FileReader()

		reader.onload = () => {
			try {
				const json = JSON.parse(reader.result as string)

				if (!json.habits || !json.logs || !json.streaks) {
					setImportError("Invalid backup file.")
					return
				}

				localStorage.setItem("habits", JSON.stringify(json.habits))
				localStorage.setItem("logs", JSON.stringify(json.logs))
				localStorage.setItem("streaks", JSON.stringify(json.streaks))

				window.location.reload()
			} catch {
				setImportError("Failed to import file.")
			}
		}

		reader.readAsText(file)
	}

	// ---------------- Reset Data ----------------
	const handleReset = () => {
		if (!confirm("Are you sure? This cannot be undone.")) return

		localStorage.removeItem("habits")
		localStorage.removeItem("logs")
		localStorage.removeItem("streaks")

		window.location.reload()
	}

	return (
		<div className="space-y-8">
			<h2 className="text-2xl font-bold">Settings</h2>
			<p className="text-muted-foreground">
				Customize your app experience and manage your data.
			</p>

			{/* THEME */}
			<div className="rounded-2xl border bg-[hsl(var(--card))] shadow-sm p-6">
				<h3 className="text-lg font-semibold mb-2">Appearance</h3>
				<p className="text-muted-foreground mb-4">
					Switch between light and dark mode.
				</p>

				<button
					onClick={toggleTheme}
					className="px-4 py-2 rounded-xl bg-indigo-600 text-white hover:bg-indigo-500 transition"
				>
					Switch to {theme === "dark" ? "Light" : "Dark"} Mode
				</button>
			</div>

			{/* DATA CONTROL */}
			<div className="rounded-2xl border bg-[hsl(var(--card))] shadow-sm p-6">
				<h3 className="text-lg font-semibold mb-2">Data Control</h3>
				<p className="text-muted-foreground mb-4">
					Export, import, or reset your tracking data.
				</p>

				<div className="flex flex-col gap-3 sm:flex-row">
					<button
						onClick={handleExport}
						className="px-4 py-2 rounded-xl bg-green-600 text-white hover:bg-green-500 transition"
					>
						Export Data
					</button>

					<label className="px-4 py-2 rounded-xl bg-yellow-600 text-white hover:bg-yellow-500 transition cursor-pointer">
						Import Data
						<input
							type="file"
							accept="application/json"
							className="hidden"
							onChange={handleImport}
						/>
					</label>

					<button
						onClick={handleReset}
						className="px-4 py-2 rounded-xl bg-red-600 text-white hover:bg-red-500 transition"
					>
						Reset All Data
					</button>
				</div>

				{importError && <p className="text-red-500 mt-4">{importError}</p>}
			</div>

			{/* STATS INFO */}
			<div className="rounded-2xl border bg-[hsl(var(--card))] shadow-sm p-6 grid sm:grid-cols-3 gap-4">
				<Stat label="Total Habits" value={habits.length} />
				<Stat label="Logs Stored" value={logs.length} />
				<Stat label="Tracked Streaks" value={streaks.length} />
			</div>
		</div>
	)
}

// ---------------- Stat Card Component ----------------
function Stat({ label, value }: { label: string; value: number }) {
	return (
		<div className="p-4 rounded-xl border bg-background shadow-sm text-center">
			<p className="text-muted-foreground text-sm">{label}</p>
			<h4 className="text-2xl font-bold">{value}</h4>
		</div>
	)
}
