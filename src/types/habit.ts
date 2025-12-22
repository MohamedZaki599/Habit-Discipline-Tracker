export type Habit = {
	id: string
	title: string
	description?: string
	frequency: "daily" | "custom"
	days?: string[]
	priority: "low" | "medium" | "high"
	difficulty: "easy" | "medium" | "hard"
	duration: number
	createdAt: string
	isActive: boolean
}

export type DailyLog = {
	id: string
	habitId: string
	date: string
	status: "completed" | "pending" | "missed"
}

export type HabitStreak = {
	habitId: string
	currentStreak: number
	longestStreak: number
	lastCompleted: string
}
