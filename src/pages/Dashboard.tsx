import ProgressRing from "@/components/ProgressRing"
import StatCard from "@/components/StatCard"
import StreakBadge from "@/components/StreakBadge"
import { useHabits } from "@/context/HabitContext"

export default function Dashboard() {
	const { habits, logs, streaks } = useHabits()

	const activeHabits = habits.filter((h) => h.isActive).length
	const inactiveHabits = habits.filter((h) => !h.isActive).length
	const totalHabits = habits.length

	const today = new Date().toISOString().split("T")[0]
	const completedToday = logs.filter((l) => l.date === today).length

	const progress =
		totalHabits === 0 ? 0 : Math.round((activeHabits / totalHabits) * 100)

	const bestStreak =
		streaks.length === 0 ? 0 : Math.max(...streaks.map((s) => s.currentStreak))

	return (
		<div className="space-y-6">
			<h2 className="text-2xl font-bold">Dashboard</h2>

			{/* Top Section */}
			<div className="flex flex-wrap justify-between items-center gap-3">
				<div>
					<h3 className="text-lg font-semibold">Welcome back 👋</h3>
					<p className="text-muted-foreground text-sm">
						Keep building strong habits. You’re doing great!
					</p>
				</div>

				<StreakBadge streak={bestStreak} />
			</div>

			{/* Progress Section */}
			<div
				className="rounded-2xl border bg-[hsl(var(--card))]
       shadow-sm p-6 flex flex-col items-center gap-4"
			>
				<h4 className="font-semibold text-lg">Overall Progress</h4>

				<ProgressRing progress={progress} />

				<p className="text-muted-foreground text-sm">Active Habits Progress</p>
			</div>

			{/* Stat Cards */}
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
				<StatCard label="Completed Today" value={completedToday} />
				<StatCard label="Active Habits" value={activeHabits} />
				<StatCard label="Inactive Habits" value={inactiveHabits} />
			</div>
		</div>
	)
}
