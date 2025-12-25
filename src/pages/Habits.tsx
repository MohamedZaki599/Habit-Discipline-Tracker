/* eslint-disable @typescript-eslint/no-explicit-any */

import { useHabits } from "@/context/HabitContext"
import HabitCard from "@/components/HabitCard"
import { useState } from "react"

export default function HabitsPage() {
	const { habits, logs } = useHabits()

	// -----------------------------------
	// Filter State (All | Active | Inactive | Completed Today)
	// -----------------------------------
	const [filter, setFilter] = useState<"all" | "active" | "inactive" | "today">(
		"all"
	)

	// -----------------------------------
	// Priority Filter State
	// -----------------------------------
	const [priorityFilter, setPriorityFilter] = useState<
		"all" | "high" | "medium" | "low"
	>("all")

	// -----------------------------------
	// Search State
	// -----------------------------------
	const [search, setSearch] = useState("")

	// -----------------------------------
	// Sorting State
	// -----------------------------------
	const [sortBy, setSortBy] = useState<"newest" | "oldest" | "az">("newest")

	// -----------------------------------
	// Today Date (used for completed today filter)
	// -----------------------------------
	const today = new Date().toISOString().split("T")[0]

	// -----------------------------------
	// Step 1 → Base Filter (Active / Inactive / Today / All)
	// -----------------------------------
	let filteredHabits = habits.filter((habit) => {
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

	// -----------------------------------
	// Step 2 → Search Filter
	// -----------------------------------
	filteredHabits = filteredHabits.filter(
		(h) =>
			h.title.toLowerCase().includes(search.toLowerCase()) ||
			(h.description?.toLowerCase() || "").includes(search.toLowerCase())
	)

	// -----------------------------------
	// Step 3 → Priority Filter
	// -----------------------------------
	if (priorityFilter !== "all") {
		filteredHabits = filteredHabits.filter((h) => h.priority === priorityFilter)
	}

	// -----------------------------------
	// Step 4 → Sorting Logic
	// -----------------------------------
	if (sortBy === "newest") {
		filteredHabits.sort(
			(a, b) =>
				new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
		)
	}

	if (sortBy === "oldest") {
		filteredHabits.sort(
			(a, b) =>
				new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
		)
	}

	if (sortBy === "az") {
		filteredHabits.sort((a, b) => a.title.localeCompare(b.title))
	}

	return (
		<div className="space-y-6">
			{/* -----------------------------------
          Page Title + Description
      ----------------------------------- */}
			<h2 className="text-2xl font-bold">Habits</h2>

			<p className="text-muted-foreground">
				Manage your habits and track your daily discipline.
			</p>

			{/* -----------------------------------
          Search Bar
      ----------------------------------- */}
			<input
				value={search}
				onChange={(e) => setSearch(e.target.value)}
				placeholder="Search habits..."
				className="w-full sm:w-1/2 px-4 py-2 rounded-xl border bg-[hsl(var(--card))]
        shadow-sm outline-none focus:ring-2 focus:ring-indigo-500 text-sm md:text-base"
			/>

			{/* -----------------------------------
          Main Filters
      ----------------------------------- */}
			<div className="flex gap-3 flex-wrap">
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

			{/* -----------------------------------
          Priority Filter
      ----------------------------------- */}
			<div className="flex gap-2 flex-wrap">
				<PriorityButton
					label="High"
					active={priorityFilter === "high"}
					onClick={() => setPriorityFilter("high")}
				/>

				<PriorityButton
					label="High"
					active={priorityFilter === "high"}
					onClick={() => setPriorityFilter("high")}
				/>

				<PriorityButton
					label="High"
					active={priorityFilter === "high"}
					onClick={() => setPriorityFilter("high")}
				/>

				<PriorityButton
					label="High"
					active={priorityFilter === "high"}
					onClick={() => setPriorityFilter("high")}
				/>
			</div>

			{/* -----------------------------------
          Sorting Dropdown
      ----------------------------------- */}
			<select
				value={sortBy}
				onChange={(e) => setSortBy(e.target.value as any)}
				className="px-4 py-2 rounded-xl border bg-[hsl(var(--card))]
        shadow-sm outline-none focus:ring-2 focus:ring-indigo-500 text-sm md:text-base"
			>
				<option value="newest">Newest First</option>
				<option value="oldest">Oldest First</option>
				<option value="az">A → Z</option>
			</select>

			{/* -----------------------------------
          Habits List
      ----------------------------------- */}
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

// ========== PRIORITY BUTTON ==========
function PriorityButton({
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
			className={`px-3 py-1 rounded-full text-sm border shadow-sm transition
      ${
				active
					? "bg-indigo-600 text-white"
					: "bg-[hsl(var(--card))] text-muted-foreground hover:bg-indigo-500 hover:text-white"
			}`}
		>
			{label}
		</button>
	)
}

/* -----------------------------------
   Main Filter Button Component
----------------------------------- */
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
