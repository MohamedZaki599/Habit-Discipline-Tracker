import AddHabitModal from "@/components/AddHabitModal"
import { useHabits } from "@/context/HabitContext"
import HabitCard from "@/components/HabitCard"

export default function Habits() {
	const { habits } = useHabits()

	return (
		<div>
			<h2 className="text-xl font-bold mb-3">Habits</h2>

			<AddHabitModal />

			<p className="mt-4 text-sm opacity-70">Total Habits: {habits.length}</p>

			<div className="mt-4 grid gap-3">
				{habits.length === 0 && (
					<p className="opacity-70">No habits yet. Start by adding one 😊</p>
				)}

				{habits.map((habit) => (
					<HabitCard key={habit.id} habit={habit} />
				))}
			</div>
		</div>
	)
}
