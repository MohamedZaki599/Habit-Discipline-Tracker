import ProgressRing from "@/components/ProgressRing"
import StreakBadge from "@/components/StreakBadge"
import StatCard from "@/components/StatCard"
import InsightCard from "@/components/InsightCard"
import { useHabits } from "@/context/HabitContext"

export default function Dashboard() {
	const { habits, logs } = useHabits()

	const activeHabits = habits.filter((h) => h.isActive).length
	const totalHabits = habits.length

	const progress =
		totalHabits === 0 ? 0 : Math.round((activeHabits / totalHabits) * 100)

	const inactiveHabits = habits.filter((h) => !h.isActive).length

	const today = new Date().toISOString().split("T")[0]

	const completedToday = logs.filter((log) => log.date === today).length

	return (
		<div>
			<h2 className="text-xl font-bold mb-3">Dashboard</h2>
			<p>Welcome back 👋</p>

			<div className="grid gap-3 mt-4">
				<div className="p-4 border rounded-lg flex justify-center">
					<ProgressRing progress={progress} />
				</div>
				<div className="p-4 border rounded-lg flex justify-center">
					<StreakBadge streak={7} />
				</div>
				<div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
					<StatCard
						label="Completed Today"
						value={completedToday}
						color="success"
					/>

					<StatCard
						label="Active Habits"
						value={activeHabits}
						color="primary"
					/>
					<StatCard
						label="Inactive Habits"
						value={inactiveHabits}
						color="warning"
					/>
				</div>
				<InsightCard
					message="You're doing great! You completed most of your habits today.
					Try to stay consistent tomorrow to extend your streak 🔥"
				/>
			</div>
		</div>
	)
}
