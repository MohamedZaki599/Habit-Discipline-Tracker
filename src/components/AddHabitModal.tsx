/* eslint-disable @typescript-eslint/no-explicit-any */
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useState } from "react"
import { useHabits } from "@/context/HabitContext"
import { Label } from "@/components/ui/label"
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select"

export default function AddHabitModal() {
	const { addHabit } = useHabits()

	const [title, setTitle] = useState("")
	const [description, setDesc] = useState("")
	const [priority, setPriority] = useState<"low" | "medium" | "high">("medium")
	const [difficulty, setDifficulty] = useState<"easy" | "medium" | "hard">(
		"medium"
	)
	const [duration, setDuration] = useState(21)
	const [isOpen, setOpen] = useState(false)

	const handleSubmit = () => {
		if (!title.trim()) return alert("Title is required")

		addHabit({
			title,
			description,
			priority,
			difficulty,
			duration,
			frequency: "daily",
			isActive: true,
		})

		setOpen(false)
		setTitle("")
		setDesc("")
	}

	return (
		<Dialog open={isOpen} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button className="mt-4">Add New Habit</Button>
			</DialogTrigger>

			<DialogContent>
				<DialogHeader>
					<DialogTitle>Create New Habit</DialogTitle>
				</DialogHeader>

				<div className="grid gap-3">
					<div>
						<Label>Title</Label>
						<Input
							value={title}
							onChange={(e) => setTitle(e.target.value)}
							placeholder="e.g. Read 15 minutes"
						/>
					</div>

					<div>
						<Label>Description</Label>
						<Textarea
							value={description}
							onChange={(e) => setDesc(e.target.value)}
							placeholder="Optional description..."
						/>
					</div>

					<div className="grid grid-cols-2 gap-3">
						<div>
							<Label>Priority</Label>
							<Select
								onValueChange={(v) => setPriority(v as any)}
								defaultValue="medium"
							>
								<SelectTrigger>
									<SelectValue />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="low">Low</SelectItem>
									<SelectItem value="medium">Medium</SelectItem>
									<SelectItem value="high">High</SelectItem>
								</SelectContent>
							</Select>
						</div>

						<div>
							<Label>Difficulty</Label>
							<Select
								onValueChange={(v) => setDifficulty(v as any)}
								defaultValue="medium"
							>
								<SelectTrigger>
									<SelectValue />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="easy">Easy</SelectItem>
									<SelectItem value="medium">Medium</SelectItem>
									<SelectItem value="hard">Hard</SelectItem>
								</SelectContent>
							</Select>
						</div>
					</div>

					<div>
						<Label>Duration (days)</Label>
						<Input
							type="number"
							value={duration}
							onChange={(e) => setDuration(Number(e.target.value))}
							min={1}
						/>
					</div>

					<Button onClick={handleSubmit} className="mt-2">
						Save Habit
					</Button>
				</div>
			</DialogContent>
		</Dialog>
	)
}
