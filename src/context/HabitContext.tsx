/* eslint-disable react-refresh/only-export-components */

import { createContext, useContext, useEffect, useState } from "react"
import type { Habit } from "@/types/habit"
import { v4 as uuid } from "uuid"

type HabitContextType = {
	habits: Habit[]
	addHabit: (habit: Omit<Habit, "id" | "createdAt">) => void
	removeHabit: (id: string) => void
	toggleHabitStatus: (id: string) => void
}

const HabitContext = createContext<HabitContextType>({
	habits: [],
	addHabit: () => {},
	removeHabit: () => {},
	toggleHabitStatus: () => {},
})

export const HabitProvider = ({ children }: { children: React.ReactNode }) => {
	const [habits, setHabits] = useState<Habit[]>(() => {
		const stored = localStorage.getItem("habits")
		return stored ? JSON.parse(stored) : []
	})

	useEffect(() => {
		localStorage.setItem("habits", JSON.stringify(habits))
	}, [habits])

	const addHabit = (habit: Omit<Habit, "id" | "createdAt">) => {
		const newHabit: Habit = {
			...habit,
			id: uuid(),
			createdAt: new Date().toISOString(),
		}
		setHabits((prev) => [...prev, newHabit])
	}

	const removeHabit = (id: string) => {
		setHabits((prev) => prev.filter((h) => h.id !== id))
	}

	const toggleHabitStatus = (id: string) => {
		setHabits((prev) =>
			prev.map((h) => (h.id === id ? { ...h, isActive: !h.isActive } : h))
		)
	}

	return (
		<HabitContext.Provider
			value={{ habits, addHabit, removeHabit, toggleHabitStatus }}
		>
			{children}
		</HabitContext.Provider>
	)
}

export const useHabits = () => useContext(HabitContext)
