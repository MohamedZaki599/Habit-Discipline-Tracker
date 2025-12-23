/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-refresh/only-export-components */

import { createContext, useContext, useEffect, useState } from "react"
import type { DailyLog, Habit, HabitStreak } from "@/types/habit"
import { v4 as uuid } from "uuid"

type HabitContextType = {
	habits: Habit[]
	logs: DailyLog[]
	streaks: HabitStreak[]
	addHabit: (habit: Omit<Habit, "id" | "createdAt">) => void
	removeHabit: (id: string) => void
	toggleHabitStatus: (id: string) => void
	markHabitCompletedToday: (habitId: string) => void
}

const HabitContext = createContext<HabitContextType>({
	habits: [],
	logs: [],
	streaks: [],
	addHabit: () => {},
	removeHabit: () => {},
	toggleHabitStatus: () => {},
	markHabitCompletedToday: () => {},
})

export const HabitProvider = ({ children }: { children: React.ReactNode }) => {
	// ========== HABITS STATE ==========
	const [habits, setHabits] = useState<Habit[]>(() => {
		const stored = localStorage.getItem("habits")
		return stored ? JSON.parse(stored) : []
	})

	// ========== LOGS STATE ==========
	const [logs, setLogs] = useState<DailyLog[]>(() => {
		const stored = localStorage.getItem("logs")
		return stored ? JSON.parse(stored) : []
	})

	// ========== STREAK STATE ==========
	const [streaks, setStreaks] = useState<HabitStreak[]>(() => {
		const stored = localStorage.getItem("streaks")
		return stored ? JSON.parse(stored) : []
	})


	// save habits
	useEffect(() => {
		localStorage.setItem("habits", JSON.stringify(habits))
	}, [habits])

	// save logs
	useEffect(() => {
		localStorage.setItem("logs", JSON.stringify(logs))
	}, [logs])

	// save streaks
useEffect(() => {
	localStorage.setItem("streaks", JSON.stringify(streaks))
}, [streaks])


	// ========== ADD HABIT ==========
	const addHabit = (habit: Omit<Habit, "id" | "createdAt">) => {
		const newHabit: Habit = {
			...habit,
			id: uuid(),
			createdAt: new Date().toISOString(),
		}
		setHabits((prev) => [...prev, newHabit])
	}

	// ========== REMOVE HABIT ==========
	const removeHabit = (id: string) => {
		setHabits((prev) => prev.filter((h) => h.id !== id))
	}

	// ========== TOGGLE ACTIVE ==========
	const toggleHabitStatus = (id: string) => {
		setHabits((prev) =>
			prev.map((h) => (h.id === id ? { ...h, isActive: !h.isActive } : h))
		)
	}

	// ========== MARK COMPLETED TODAY ==========
	const markHabitCompletedToday = (habitId: string) => {
		const today = new Date().toISOString().split("T")[0]

		const alreadyLogged = logs.some(
			(log) => log.habitId === habitId && log.date === today
		)

		if (alreadyLogged) return

		// ========== LOG ==========
		setLogs((prev) => [
			...prev,
			{
				id: uuid(),
				habitId,
				date: today,
				status: "completed",
			},
		])

		// ========== UPDATE STREAK ==========
		setStreaks((prev) => {
			const existing = prev.find((s) => s.habitId === habitId)

			if (!existing) {
				// first time
				return [
					...prev,
					{
						habitId,
						currentStreak: 1,
						longestStreak: 1,
						lastCompleted: today,
					},
				]
			}

			const lastDate = new Date(existing.lastCompleted)
			const todayDate = new Date(today)

			const diffDays = Math.floor(
				(todayDate.getTime() - lastDate.getTime()) / (1000 * 60 * 60 * 24)
			)


			let newCurrent = existing.currentStreak

			if (diffDays === 1) {
				// continuous 🔥
				newCurrent = existing.currentStreak + 1
			} else if (diffDays > 1) {
				// interrupted starts again
				newCurrent = 1
			} else {
				// same day nothing
				return prev
			}

			return prev.map((s) =>
				s.habitId === habitId
					? {
							...s,
							currentStreak: newCurrent,
							longestStreak: Math.max(existing.longestStreak, newCurrent),
							lastCompleted: today,
					  }
					: s
			)
		})
	}


	return (
		<HabitContext.Provider
			value={{
				habits,
				logs,
				streaks,
				addHabit,
				removeHabit,
				toggleHabitStatus,
				markHabitCompletedToday,
			}}
		>
			{children}
		</HabitContext.Provider>
	)
}

export const useHabits = () => useContext(HabitContext)
