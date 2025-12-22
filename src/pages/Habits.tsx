import AddHabitModal from "@/components/AddHabitModal"
import { useHabits } from "@/context/HabitContext"

export default function Habits() {
	const { habits } = useHabits()

	return (
		<div>
			<h2 className="text-xl font-bold mb-3">Habits</h2>

			<AddHabitModal />

			<p className="mt-4 text-sm opacity-70">Total Habits: {habits.length}</p>
		</div>
	)
}
