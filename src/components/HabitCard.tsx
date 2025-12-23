import { motion } from "framer-motion"
import { Trash2, CheckCircle2, CircleOff } from "lucide-react"
import type { Habit } from "@/types/habit"
import { useHabits } from "@/context/HabitContext"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

export default function HabitCard({ habit }: { habit: Habit }) {
	const { removeHabit, toggleHabitStatus, markHabitCompletedToday, logs } =
		useHabits()

	const today = new Date().toISOString().split("T")[0]

	const completedToday = logs.some(
		(log) => log.habitId === habit.id && log.date === today
	)

	return (
		<motion.div
			initial={{ opacity: 0, y: 12 }}
			animate={{ opacity: 1, y: 0 }}
			className="rounded-xl border bg-[hsl(var(--card))] p-4 shadow-sm flex flex-col gap-3"
		>
			{/* Header */}
			<div className="flex justify-between items-center">
				<h3 className="text-lg font-semibold">{habit.title}</h3>

				<div className="flex gap-2">
					<Badge
						className={
							habit.priority === "high"
								? "bg-red-500"
								: habit.priority === "medium"
								? "bg-yellow-500"
								: "bg-green-500"
						}
					>
						{habit.priority}
					</Badge>

					<Badge variant="secondary">{habit.difficulty}</Badge>
				</div>
			</div>

			{/* Description */}
			{habit.description && (
				<p className="text-sm opacity-70">{habit.description}</p>
			)}

			{/* Footer */}
			<div className="flex justify-between items-center mt-2">
				{/* Status */}
				<div className="flex items-center gap-2">
					{habit.isActive ? (
						<>
							<CheckCircle2 className="text-green-500" />
							<span className="text-sm">Active</span>
						</>
					) : (
						<>
							<CircleOff className="text-red-500" />
							<span className="text-sm">Inactive</span>
						</>
					)}
				</div>

				{/* Actions */}
				<div className="flex gap-2">
					{!completedToday && habit.isActive && (
						<Button
							variant="default"
							onClick={() => markHabitCompletedToday(habit.id)}
						>
							Mark Done
						</Button>
					)}

					{completedToday && (
						<span className="text-green-500 text-sm">Completed Today ✔️</span>
					)}

					<Button variant="outline" onClick={() => toggleHabitStatus(habit.id)}>
						Toggle
					</Button>

					<Button variant="destructive" onClick={() => removeHabit(habit.id)}>
						<Trash2 size={18} />
					</Button>
				</div>
			</div>
		</motion.div>
	)
}
