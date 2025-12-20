import { useState } from "react"
import reactLogo from "./assets/react.svg"
import viteLogo from "/vite.svg"
import "./App.css"

function App() {
	const [count, setCount] = useState(0)

	return (
		<>
			<h1 className="text-3xl font-bold underline">Hello world!</h1>
			<button className="bg-blue-500 text-white p-2 rounded-md">
				Click me
			</button>
			<svg className="size-6 animate-bounce" viewBox="0 0 24 24">
				<path d="M12 2L2 22h20L12 2z" />
			</svg>
			Processing…
			<div>
				<a href="https://vite.dev" target="_blank">
					<img src={viteLogo} className="logo" alt="Vite logo" />
				</a>
				<a href="https://react.dev" target="_blank">
					<img src={reactLogo} className="logo react" alt="React logo" />
				</a>
			</div>
			<h1>Vite + React</h1>
			<div className="card">
				<button onClick={() => setCount((count) => count + 1)}>
					count is {count}
				</button>
				<p>
					Edit <code>src/App.tsx</code> and save to test HMR
				</p>
			</div>
			<p className="read-the-docs">
				Click on the Vite and React logos to learn more
			</p>
		</>
	)
}

export default App
