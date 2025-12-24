import { useHabits } from "@/context/HabitContext"
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts"


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

	const weeklyData = last7Days.map((date) => {
		const completed = logs.filter((l) => l.date === date).length

		return {
			date,
			completed,
		}
	})


	return (
		<div className="space-y-6">
			<h2 className="text-2xl font-bold">Analytics</h2>

			<p className="text-muted-foreground">
				Track your habit performance and progress trends over time.
			</p>

			<div
				className="rounded-2xl border bg-[hsl(var(--card))]
 shadow-sm p-6"
			>
				<h4 className="font-semibold mb-4">Weekly Performance</h4>

				<div className="h-64">
					<ResponsiveContainer width="100%" height="100%">
						<BarChart data={weeklyData}>
							<XAxis dataKey="date" />
							<YAxis allowDecimals={false} />
							<Tooltip />
							<Bar dataKey="completed" fill="#4ade80" radius={6} />
						</BarChart>
					</ResponsiveContainer>
				</div>
			</div>
		</div>
	)
}
