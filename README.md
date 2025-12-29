# 🧠 Habit & Discipline Tracker

A modern productivity & discipline system built with React + TypeScript — focused on building habits, tracking consistency, visual analytics, and maintaining discipline.

---

## 🚀 Live Demo

🔗 https://habit-discipline-tracker.vercel.app

---

## 🎯 What This App Solves

Most people fail habits not because of motivation…  
but because they **cannot see their discipline**, progress, and streak accountability visually.

This app helps you:
✔ Build habits  
✔ Track daily completion  
✔ Maintain streaks  
✔ Visualize progress  
✔ Stay disciplined

---

## 🧩 Core Features

### 🏠 Dashboard

- Animated Progress Ring (overall active habits progress)
- Daily Stats Cards:
  - Completed Today
  - Active Habits
  - Inactive Habits
- Streak 🔥 System (best streak badge)
- Welcome message with motivational text
- Clean, elegant UI with responsive design

### 📋 Habits System

- Add / Remove / Toggle habits
- Daily completion tracking
- Priority system (Low / Medium / High)
- Difficulty levels (Easy / Medium / Hard)
- Custom frequency options
- Advanced Filters:
  - All
  - Active
  - Inactive
  - Completed Today
  - Priority-based filtering
- Real-time search
- Sorting options (Newest / Oldest / A → Z)

### 📊 Analytics

- Weekly progress bar chart (last 7 days)
- Completed vs Missed pie chart visualization
- 30-Day Heatmap (GitHub-style activity visualization)
- Weekly statistics:
  - Total completed this week
  - Best day performance
  - Consistency score

### ⚙️ Settings Page

- Light / Dark Theme toggle
- Data Management:
  - Export Data (JSON Backup)
  - Import Data (restore from backup)
  - Reset System (clear all data)
- Storage Statistics:
  - Total Habits count
  - Logs Stored count
  - Tracked Streaks count
- LocalStorage persistence (automatic)

---

## 🛠 Tech Stack

| Category   | Technology                     |
| ---------- | ------------------------------ |
| Framework  | React 19 + TypeScript          |
| Build Tool | Vite 7                         |
| Styling    | TailwindCSS 4 + tw-animate-css |
| Routing    | React Router DOM v7            |
| State      | React Context API              |
| Charts     | Recharts                       |
| Animations | Framer Motion                  |
| UI System  | shadcn/ui (Radix UI)           |
| Icons      | Lucide React                   |
| Utils      | UUID, clsx, tailwind-merge     |

---

## 🎨 Design Philosophy

✔ Dark mode first  
✔ Soft neumorphic style  
✔ Clean dashboard UX  
✔ Mobile-first responsive  
✔ Semantic color tokens

---

## 📂 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # shadcn/ui components (Button, Dialog, etc.)
│   ├── AddHabitModal.tsx
│   ├── HabitCard.tsx
│   ├── Heatmap.tsx
│   ├── InsightCard.tsx
│   ├── ProgressRing.tsx
│   ├── StatCard.tsx
│   └── StreakBadge.tsx
├── context/            # React Context providers
│   ├── HabitContext.tsx
│   ├── ThemeContext.tsx
│   └── ThemeProvider.tsx
├── pages/              # Page components
│   ├── Dashboard.tsx
│   ├── Habits.tsx
│   ├── Analytics.tsx
│   └── Settings.tsx
├── layouts/            # Layout components
│   └── AppLayout.tsx
├── routes/             # Route configuration
│   └── AppRoutes.tsx
├── types/              # TypeScript type definitions
│   └── habit.ts
├── lib/                # Utility functions
│   └── utils.ts
├── hooks/              # Custom React hooks (future)
├── styles/             # Global styles (future)
├── index.css           # Global CSS
└── main.tsx            # Application entry point
```

---

## ⚙️ Install & Run Locally

### 1️⃣ Clone Repo

```bash
git clone https://github.com/MohamedZaki599/Habit-Discipline-Tracker.git
cd Habit-Discipline-Tracker
```

### 2️⃣ Install Dependencies

```bash
npm install
```

### 3️⃣ Run Dev Server

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### 4️⃣ Build for Production

```bash
npm run build
```

### 5️⃣ Preview Production Build

```bash
npm run preview
```

### 6️⃣ Lint Code

```bash
npm run lint
```

## ☁️ Deployment

Fully optimized & production ready — deployed via **Vercel**.

### Quick Deploy

1. Push to `main` branch
2. Vercel automatically builds and deploys
3. Live at: https://habit-discipline-tracker.vercel.app

### Manual Deployment

The project is configured for Vercel with:

- Automatic builds on push
- Optimized production builds
- Fast refresh in development

---

## 🧠 Data Storage

**No backend required** — fully client-side application

- **LocalStorage** for all data persistence
- **Automatic saving** on every change
- **Export/Import** functionality for backups
- **Theme preference** stored in localStorage

### Stored Data Structure:

```typescript
{
  habits: Habit[]      // All habit definitions
  logs: DailyLog[]     // Daily completion records
  streaks: HabitStreak[] // Streak tracking data
  theme: "light" | "dark" // User theme preference
}
```

---

## 🔥 Roadmap

- [ ] Notifications / Reminders
- [ ] User Authentication
- [ ] Cloud Sync (Supabase / Firebase)
- [ ] AI Habit Suggestions
- [ ] Streak Rewards Gamification
- [ ] Mobile App Version

---

## 🤝 Contributing

Pull requests welcome 💙

---

## 📜 License

MIT License

---

## 👨‍💻 Developer

Built with passion & discipline by **Mohamed Zaki**

---
