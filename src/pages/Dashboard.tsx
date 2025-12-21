import ProgressRing from "@/components/ProgressRing"

export default function Dashboard() {
	return (
		<div>
			<h2 className="text-xl font-bold mb-3">Dashboard</h2>
			<p>Welcome back 👋</p>

			<div className="grid gap-3 mt-4">
				<div className="p-4 border rounded-lg flex justify-center">
					<ProgressRing progress={65} />
				</div>
				<div className="p-4 border rounded-lg">Streak Placeholder</div>
				<div className="p-4 border rounded-lg">Stats Placeholder</div>
				<div className="p-4 border rounded-lg">AI Insight Placeholder</div>
			</div>
		</div>
	)
}
