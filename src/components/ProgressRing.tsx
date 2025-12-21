import { motion } from "framer-motion"

type ProgressRingProps = {
	size?: number
	strokeWidth?: number
	progress: number // 0 - 100
}

export default function ProgressRing({
	size = 140,
	strokeWidth = 12,
	progress,
}: ProgressRingProps) {
	const radius = (size - strokeWidth) / 2
	const circumference = 2 * Math.PI * radius

	const offset = circumference - (progress / 100) * circumference

	return (
		<div className="flex flex-col items-center justify-center">
			<svg width={size} height={size} className="-rotate-90">
				{/* Background circle */}
				<circle
					stroke="hsl(var(--muted))"
					fill="transparent"
					strokeWidth={strokeWidth}
					r={radius}
					cx={size / 2}
					cy={size / 2}
				/>

				{/* Animated Progress Circle */}
				<motion.circle
					stroke="hsl(var(--primary))"
					fill="transparent"
					strokeWidth={strokeWidth}
					strokeLinecap="round"
					r={radius}
					cx={size / 2}
					cy={size / 2}
					strokeDasharray={circumference}
					strokeDashoffset={offset}
					animate={{ strokeDashoffset: offset }}
					transition={{ duration: 1, ease: "easeInOut" }}
				/>
			</svg>

			{/* Text */}
			<p className="mt-2 text-lg font-semibold">{progress}% Completed</p>
		</div>
	)
}
