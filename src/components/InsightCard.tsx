import { Brain, Sparkles } from "lucide-react"
import { motion } from "framer-motion"

type InsightCardProps = {
	message: string
}

export default function InsightCard({ message }: InsightCardProps) {
	return (
		<motion.div
			initial={{ opacity: 0, y: 15 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5 }}
			className="rounded-xl border bg-[hsl(var(--card))] p-5 shadow-sm flex gap-4 items-start"
		>
			<motion.div
				animate={{ rotate: [0, -6, 6, 0] }}
				transition={{ repeat: Infinity, duration: 3 }}
				className="p-3 rounded-full bg-[hsl(var(--primary))]/20"
			>
				<Brain className="text-[hsl(var(--primary))]" size={28} />
			</motion.div>

			<div className="flex flex-col gap-2">
				<p className="text-sm opacity-70 flex gap-2 items-center">
					<Sparkles size={16} className="text-[hsl(var(--warning))]" />
					Smart Insight
				</p>

				<p className="text-lg font-semibold leading-snug">{message}</p>
			</div>
		</motion.div>
	)
}
