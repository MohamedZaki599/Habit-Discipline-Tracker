import { useHabits } from "@/context/HabitContext"
import {
	BarChart,
	Bar,
	XAxis,
	YAxis,
	Tooltip,
	ResponsiveContainer,
} from "recharts"

export default function Analytics() {
	const { logs } = useHabits()

	const today = new Date()

	const last7Days = Array.from({ length: 7 })
		.map((_, i) => {
			const d = new Date()
			d.setDate(today.getDate() - i)
			return d.toISOString().split("T")[0]
		})
		.reverse()

	const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

	const weeklyData = last7Days.map((date) => {
		const completed = logs.filter((l) => l.date === date).length
		const d = new Date(date)

		return {
			date,
			label: weekDays[d.getDay()],
			completed,
		}
	})

	const totalWeekCompleted = weeklyData.reduce((a, b) => a + b.completed, 0)

	const bestDay =
		weeklyData.length === 0
			? { label: "N/A", completed: 0 }
			: weeklyData.reduce((a, b) => (b.completed > a.completed ? b : a))

	return (
		<div className="space-y-6">
			<h2 className="text-2xl font-bold">Analytics</h2>

			<p className="text-muted-foreground">
				Track your habit performance and progress trends over time.
			</p>

			{/* Weekly Chart */}
			<div
				className="rounded-2xl border bg-[hsl(var(--card))]
       shadow-sm p-6"
			>
				<h4 className="font-semibold mb-4">Weekly Performance</h4>

				<div className="h-64">
					<ResponsiveContainer width="100%" height="100%">
						<BarChart data={weeklyData}>
							<XAxis dataKey="label" />
							<YAxis allowDecimals={false} />
							<Tooltip
								contentStyle={{
									background: "#111",
									borderRadius: "10px",
									color: "white",
								}}
							/>
							<Bar
								dataKey="completed"
								fill="#6d7cff"
								radius={[10, 10, 10, 10]}
							/>
						</BarChart>
					</ResponsiveContainer>
				</div>
			</div>

			{/* Insight Cards */}
			<div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
				<div
					className="rounded-2xl border bg-[hsl(var(--card))]
        shadow-sm p-5"
				>
					<h4 className="text-sm text-muted-foreground">
						Total Completed This Week
					</h4>
					<p className="text-3xl font-bold">{totalWeekCompleted}</p>
				</div>

				<div
					className="rounded-2xl border bg-[hsl(var(--card))]
        shadow-sm p-5"
				>
					<h4 className="text-sm text-muted-foreground">Best Day</h4>
					<p className="text-2xl font-semibold">
						{bestDay.label} — {bestDay.completed}
					</p>
				</div>

				<div
					className="rounded-2xl border bg-[hsl(var(--card))]
        shadow-sm p-5"
				>
					<h4 className="text-sm text-muted-foreground">Consistency Score</h4>
					<p className="text-2xl font-bold">
						{Math.round((totalWeekCompleted / 7) * 10)}%
					</p>
				</div>
			</div>
		</div>
	)
}
