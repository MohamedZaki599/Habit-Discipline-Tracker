import { Flame } from "lucide-react"

export default function StreakBadge({ streak }: { streak: number }) {
	return (
		<div
			className="flex items-center gap-2 rounded-full px-4 py-2
     bg-orange-500 text-white shadow-md"
		>
			<Flame className="text-yellow-300" />
			<span className="font-semibold">{streak} Day Streak</span>
		</div>
	)
}
