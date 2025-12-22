import { motion } from "framer-motion"

type StatCardProps = {
	label: string
	value: number
	color: "primary" | "success" | "warning"
}

export default function StatCard({ label, value, color }: StatCardProps) {
	const colorMap: Record<typeof color, string> = {
		primary: "var(--primary)",
		success: "var(--success)",
		warning: "var(--warning)",
	}

	return (
		<motion.div
			initial={{ y: 15, opacity: 0 }}
			animate={{ y: 0, opacity: 1 }}
			transition={{ duration: 0.4 }}
			className="rounded-xl border bg-[hsl(var(--card))] p-4 shadow-sm flex flex-col gap-2"
		>
			<span className="text-sm opacity-70">{label}</span>

			<div className="flex items-center gap-2">
				<span
					className="inline-block w-3 h-3 rounded-full"
					style={{ background: `hsl(${colorMap[color]})` }}
				/>

				<p
					className="text-3xl font-bold"
					style={{ color: `hsl(${colorMap[color]})` }}
				>
					{value}
				</p>
			</div>
		</motion.div>
	)
}
