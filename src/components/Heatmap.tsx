import { useHabits } from "@/context/HabitContext"

export default function Heatmap() {
	const { logs } = useHabits()

	// last 30 days
	const days = Array.from({ length: 30 })
		.map((_, i) => {
			const d = new Date()
			d.setDate(d.getDate() - i)
			return d.toISOString().split("T")[0]
		})
		.reverse()

	const data = days.map((date) => {
		const count = logs.filter((l) => l.date === date).length
		return { date, count }
	})

	const getColor = (value: number) => {
		if (value === 0) return "bg-gray-700"
		if (value === 1) return "bg-green-300"
		if (value === 2) return "bg-green-500"
		if (value >= 3) return "bg-green-700"
	}

	return (
		<div
			className="rounded-2xl border bg-[hsl(var(--card))]
    shadow-sm p-6 space-y-4"
		>
			<h4 className="font-semibold">Activity Heatmap</h4>

			<div className="grid grid-cols-10 gap-2">
				{data.map((d, i) => (
					<div
						key={i}
						title={`${d.date} — ${d.count} completed`}
						className={`w-6 h-6 rounded ${getColor(d.count!)} 
            transition hover:scale-110`}
					/>
				))}
			</div>

			<p className="text-muted-foreground text-sm">
				Last 30 days — darker = more habits completed
			</p>
		</div>
	)
}
