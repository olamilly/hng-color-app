import React, { useState, useEffect, useRef } from "react";
import "./App.css";

// Distinct color palette to ensure very different colors
const COLOR_PALETTE = [
	"#FF6B6B", // Bright Red
	"#4ECDC4", // Turquoise
	"#45B7D1", // Sky Blue
	"#6C5CE7", // Purple
	"#FF8A5B", // Coral
	"#2ECC71", // Emerald Green
	"#AF7AC5", // Lavender
	"#F39C12", // Orange
	"#E74C3C", // Saturated Red
	"#3498DB", // Bright Blue
	"#1ABC9C", // Teal
	"#0F979B", // Tealish Blue
	"#41378B", // Deep Purple
	"#5777CB", // Soft Blue
	"#9F3B1C", // Rust Red
	"#DDD5DA", // Light Grayish Purple
	"#F6AC0A", // Golden Yellow
];

const App = () => {
	const [targetColor, setTargetColor] = useState("");
	const [colorOptions, setColorOptions] = useState([]);
	const [score, setScore] = useState(0);
	const [rounds, setRounds] = useState(1);
	const [gameStatus, setGameStatus] = useState("");
	const colorOptionsRef = useRef(null);
	const gameStatusRef = useRef(null);

	// Function to get random unique colors
	const getRandomColors = () => {
		const shuffled = [...COLOR_PALETTE].sort(() => 0.5 - Math.random());
		const selected = shuffled.slice(0, 6);
		return selected;
	};

	// Initialize or reset the game
	const initGame = () => {
		const colors = getRandomColors();
		const target = colors[Math.floor(Math.random() * colors.length)];
		setColorOptions(colors.sort(() => 0.5 - Math.random()));

		setTargetColor(target);
		setGameStatus("");
	};

	// Restart the game
	const restartGame = () => {
		setRounds(1);
		setScore(0);
		initGame();
	};

	// Handle color selection
	const handleColorSelect = (selectedColor) => {
		if (selectedColor === targetColor) {
			setScore((prevScore) => prevScore + 1);
			setGameStatus("correct");
		} else {
			setGameStatus("wrong");
		}
		gameStatusRef.current.classList.toggle("hidden");
		colorOptionsRef.current.classList.toggle("pointer-events-none");
		setTimeout(() => {
			initGame();
			setRounds((prevRounds) => prevRounds + 1);
			gameStatusRef.current.classList.toggle("hidden");
			colorOptionsRef.current.classList.toggle("pointer-events-none");
		}, 800);
	};

	// Initialize game on component mount
	useEffect(() => {
		initGame();
	}, []);

	return (
		<div className="flex flex-col items-center justify-center w-full p-4">
			<h1 className="text-2xl font-bold mb-4 text-gray-800">
				Color Guessing Game
			</h1>

			{/* Game Instructions */}
			<div
				data-testid="gameInstructions"
				className="flex flex-col justify-center items-center gap-2 mb-4 text-gray-600"
			>
				<span>Guess the correct color by clicking the matching color.</span>
				<span>See how many you can guess in 10 rounds.</span>
			</div>
			{rounds <= 10 ? (
				<div className="w-full max-w-md bg-white rounded-xl shadow-lg p-6 text-center">
					<div className="w-full flex justify-between items-center">
						{/* Score */}
						<div
							data-testid="score"
							className="text-xl text-black font-bold mb-4"
						>
							Score: {score}
						</div>
						{/* Rounds */}
						<div className="text-xl text-black font-bold mb-4">
							Round: {rounds}/10
						</div>
					</div>
					{/* Target Color Box */}
					<div
						data-testid="colorBox"
						className="w-full h-40 mb-6 rounded-lg shadow-md"
						style={{ backgroundColor: targetColor }}
					/>

					{/* Game Status */}
					<div
						data-testid="gameStatus"
						className="mb-4 h-6 hidden"
						ref={gameStatusRef}
					>
						{gameStatus === "correct" && (
							<div className="flex items-center justify-center font-bold text-green-600">
								Correct Guess!🥳
							</div>
						)}
						{gameStatus === "wrong" && (
							<div className="flex items-center justify-center font-bold text-red-600">
								Wrong Guess😢
							</div>
						)}
					</div>

					{/* Color Options */}
					<div
						className="flex flex-wrap mb-6 gap-4 justify-center"
						ref={colorOptionsRef}
					>
						{colorOptions.map((color, index) => (
							<div
								key={color}
								data-testid="colorOption"
								className="cursor-pointer p-6 rounded-[50%] shadow-md transform transition-all hover:scale-115 active:scale-95"
								style={{
									backgroundColor: color,
								}}
								onClick={() => handleColorSelect(color)}
							></div>
						))}
					</div>
				</div>
			) : (
				<div className="w-full max-w-md bg-white rounded-xl shadow-lg p-6 text-center">
					{/* Game Over Message */}
					<h2 className=" text-2xl font-bold mb-4 text-gray-800">Game Over!</h2>
					<div className="text-[black] mb-2">
						Your Score was: <br /> <h1 className="text-2xl">{score}</h1>
					</div>
					{score >= 5 ? (
						<h2 className="text-[black] mb-4">Great Job 🎉</h2>
					) : (
						<h2 className="text-[black] mb-4">Better luck next time 💪🏽</h2>
					)}
					{/* New Game Button */}
					<button
						data-testid="newGameButton"
						className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors flex items-center mx-auto"
						onClick={restartGame}
					>
						New Game
					</button>
				</div>
			)}
		</div>
	);
};

export default App;
