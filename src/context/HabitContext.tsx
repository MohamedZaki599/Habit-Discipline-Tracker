/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-refresh/only-export-components */

import { createContext, useContext, useEffect, useState } from "react"
import type { DailyLog, Habit } from "@/types/habit"
import { v4 as uuid } from "uuid"

type HabitContextType = {
	habits: Habit[]
	logs: DailyLog[]
	addHabit: (habit: Omit<Habit, "id" | "createdAt">) => void
	removeHabit: (id: string) => void
	toggleHabitStatus: (id: string) => void
	markHabitCompletedToday: (habitId: string) => void
}

const HabitContext = createContext<HabitContextType>({
	habits: [],
	logs: [],
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

	// save habits
	useEffect(() => {
		localStorage.setItem("habits", JSON.stringify(habits))
	}, [habits])

	// save logs
	useEffect(() => {
		localStorage.setItem("logs", JSON.stringify(logs))
	}, [logs])

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

		setLogs((prev) => [
			...prev,
			{
				id: uuid(),
				habitId,
				date: today,
				status: "completed",
			},
		])
	}

	return (
		<HabitContext.Provider
			value={{
				habits,
				logs,
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
