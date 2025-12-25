import { useHabits } from "@/context/HabitContext"
import HabitCard from "@/components/HabitCard"
import { useState } from "react"

export default function HabitsPage() {
	const { habits, logs } = useHabits()

	const [filter, setFilter] = useState<"all" | "active" | "inactive" | "today">(
		"all"
	)

	const today = new Date().toISOString().split("T")[0]

	const filteredHabits = habits.filter((habit) => {
		if (filter === "active") return habit.isActive

		if (filter === "inactive") return !habit.isActive

		if (filter === "today") {
			const completed = logs.some(
				(l) => l.habitId === habit.id && l.date === today
			)
			return completed
		}

		return true
	})

	return (
		<div className="space-y-6">
			<h2 className="text-2xl font-bold">Habits</h2>

			{/* Header */}
			<p className="text-muted-foreground">
				Manage your habits and track your daily discipline.
			</p>

			{/* Filters */}
			<div className="flex gap-3">
				<FilterButton
					label="All"
					active={filter === "all"}
					onClick={() => setFilter("all")}
				/>
				<FilterButton
					label="Active"
					active={filter === "active"}
					onClick={() => setFilter("active")}
				/>
				<FilterButton
					label="Inactive"
					active={filter === "inactive"}
					onClick={() => setFilter("inactive")}
				/>
				<FilterButton
					label="Completed Today"
					active={filter === "today"}
					onClick={() => setFilter("today")}
				/>
			</div>

			{/* Habits List */}
			{filteredHabits.length === 0 ? (
				<div className="rounded-2xl border bg-[hsl(var(--card))] shadow-sm p-6 text-center text-muted-foreground">
					No habits found under this filter.
				</div>
			) : (
				<div className="space-y-4">
					{filteredHabits.map((habit) => (
						<HabitCard key={habit.id} habit={habit} />
					))}
				</div>
			)}
		</div>
	)
}

function FilterButton({
	label,
	active,
	onClick,
}: {
	label: string
	active: boolean
	onClick: () => void
}) {
	return (
		<button
			onClick={onClick}
			className={`px-4 py-2 rounded-full text-sm transition 
      border shadow-sm
      ${
				active
					? "bg-indigo-600 text-white border-indigo-500"
					: "bg-[hsl(var(--card))] text-muted-foreground hover:text-white hover:bg-indigo-500"
			}`}
		>
			{label}
		</button>
	)
}
