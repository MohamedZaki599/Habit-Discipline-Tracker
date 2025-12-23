import { motion } from "framer-motion"
import { Trash2} from "lucide-react"
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
			className="rounded-2xl border bg-[hsl(var(--card))] text-[hsl(var(--card-foreground))]
 shadow-sm hover:shadow-md transition-all p-5 flex flex-col gap-4"
		>
			{/* Header */}
			<div className="flex justify-between items-start gap-3">
				<div>
					<h3 className="text-lg font-semibold leading-tight">{habit.title}</h3>
					{habit.description && (
						<p className="text-sm text-muted-foreground mt-1">
							{habit.description}
						</p>
					)}
				</div>

				{/* Priority */}

				<div className="flex gap-2">
					<Badge
						className={
							habit.priority === "high"
								? "bg-red-500 text-white"
								: habit.priority === "medium"
								? "bg-yellow-500 text-black"
								: "bg-green-500 text-white"
						}
					>
						{habit.priority}
					</Badge>

					<Badge variant="secondary">{habit.difficulty}</Badge>
				</div>
			</div>

			{/* Footer */}
			<div className="flex justify-between items-center pt-2">
				<div>
					{habit.isActive ? (
						<span className="text-green-500 text-sm flex items-center gap-1">
							Active
						</span>
					) : (
						<span className="text-red-500 text-sm flex items-center gap-1">
							Inactive
						</span>
					)}
				</div>

				<div className="flex gap-2">
					{!completedToday && habit.isActive && (
						<Button
							variant="default"
							onClick={() => markHabitCompletedToday(habit.id)}
						>
							Mark Done
						</Button>
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
