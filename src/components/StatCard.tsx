/* eslint-disable @typescript-eslint/no-explicit-any */
import { motion } from "framer-motion"

type Props = {
	label: string
	value: number
	icon?: any
}

export default function StatCard({ label, value, icon: Icon }: Props) {
	return (
		<motion.div
			whileHover={{ scale: 1.02 }}
			className="rounded-2xl border bg-[hsl(var(--card))]
      shadow-sm p-5 flex items-center justify-between gap-4"
		>
			<div>
				<h4 className="text-sm text-muted-foreground">{label}</h4>
				<p className="text-2xl font-bold">{value}</p>
			</div>

			{Icon && (
				<div className="p-3 rounded-full bg-muted">
					<Icon className="size-6" />
				</div>
			)}
		</motion.div>
	)
}
