import { Flame } from "lucide-react"
import { motion } from "framer-motion"

type StreakBadgeProps = {
	streak: number
}

export default function StreakBadge({ streak }: StreakBadgeProps) {
	return (
		<motion.div
			initial={{ scale: 0.8, opacity: 0 }}
			animate={{ scale: 1, opacity: 1 }}
			transition={{ duration: 0.4, ease: "easeOut" }}
			className="flex items-center gap-3 p-4 rounded-xl border bg-[hsl(var(--card))]"
		>
			<motion.div
				animate={{ rotate: [0, -8, 8, 0] }}
				transition={{ repeat: Infinity, duration: 2 }}
				className="p-3 rounded-full bg-[hsl(var(--warning))]/20"
			>
				<Flame
					size={28}
					className="text-[hsl(var(--warning))] drop-shadow-md"
				/>
			</motion.div>

			<div>
				<p className="text-sm opacity-70">Current Streak</p>
				<p className="text-2xl font-bold">{streak} Days</p>
			</div>
		</motion.div>
	)
}
