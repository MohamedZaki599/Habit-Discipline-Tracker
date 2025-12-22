import ProgressRing from "@/components/ProgressRing"
import StreakBadge from "@/components/StreakBadge"
import StatCard from "@/components/StatCard"


export default function Dashboard() {
	return (
		<div>
			<h2 className="text-xl font-bold mb-3">Dashboard</h2>
			<p>Welcome back 👋</p>

			<div className="grid gap-3 mt-4">
				<div className="p-4 border rounded-lg flex justify-center">
					<ProgressRing progress={65} />
				</div>
				<div className="p-4 border rounded-lg flex justify-center">
					<StreakBadge streak={7} />
				</div>
				<div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
					<StatCard label="Completed Today" value={5} color="success" />
					<StatCard label="Pending" value={3} color="primary" />
					<StatCard label="Missed" value={1} color="warning" />
				</div>
				<div className="p-4 border rounded-lg">AI Insight Placeholder</div>
			</div>
		</div>
	)
}
