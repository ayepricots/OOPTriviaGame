"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; // For navigation
import questions from "@/data/questions.json";
import Image from "next/image";
import backgroundImage from "@/assets/bg_dim.png";
import tankImage from "@/assets/window_tank.png";
import windowLong from "@/assets/window_long.png";
import fishImage from "@/assets/ayefish2.png";
import ivoryfish from "@/assets/ivoryfish.png";
import ayefish from "@/assets/ayefish.png";
import richmanfish from "@/assets/richmanfish.png";
import doneImage from "@/assets/btn_done.png";
import Link from "next/link";

interface Question {
	category: string;
	question: string;
	options: string[];
	correctAnswer: string;
}

export default function Game() {

	// cute background music!
	useEffect(() => {
		const music = new Audio('/audio/dewwy.wav');
		music.loop = true; // Loop the music
		music.volume = 0.5; // Adjust volume as needed
		music.play();

		return () => {
			music.pause();
			music.currentTime = 0; // Reset audio when leaving page
		};
	}, []);

	// buzzer sound
	const playBuzzerSound = () => {
		const buzzerAudio = new Audio('/audio/buzzer.wav');
		buzzerAudio.volume = 0.5; // Adjust volume as needed
		buzzerAudio.play();
	};

	// correct sound
	const playCorrectSound = () => {
		const correctAudio = new Audio('/audio/correct.wav');
		const cronchAudio = new Audio('/audio/cronch.wav');
		correctAudio.play();
		// cronchAudio.play();
	}

	// incorrect sound
	const playIncorrectSound = () => {
		const incorrectAudio = new Audio('/audio/incorrect.wav');
		incorrectAudio.volume = 0.2; // Adjust volume as needed
		incorrectAudio.play();
	}

	const [gameSettings, setGameSettings] = useState<{ timeLimit?: string; fishPositions?: any[]; category?: string; }>({});
	const [timer, setTimer] = useState<number>(300); // Default to 5 min Mode
	const [fishPositions, setFishPositions] = useState<any[]>([]);
	const [numPlayers, setNumPlayers] = useState<number>(0);
	const [players, setPlayers] = useState<any[]>([]);

	useEffect(() => {
		const settings = JSON.parse(localStorage.getItem("gameSettings") || "{}");
		setGameSettings(settings);
		console.log("Game settings loaded:", settings);

		// Set timer based on game settings
		setTimer(
			settings.timeLimit === "2min" ? 120 :
				settings.timeLimit === "10min" ? 600 :
					settings.timeLimit === "Zen" ? Infinity :
						300 // Default to 5 min
		);

		const fishPositions = settings.fishPositions || [];
		const numPlayers = Math.min(fishPositions.length, 4);

		setFishPositions(fishPositions);
		setNumPlayers(numPlayers);
	}, []);

	// Initialize players **after** numPlayers is set
	const fishImages = [ivoryfish, fishImage, ayefish, richmanfish];

	useEffect(() => {
		if (numPlayers > 0) {
			setPlayers(
				Array.from({ length: numPlayers }, (_, i) => ({
					id: i,
					score: 1,
					streak: 0,
					key: ["A", "F", "J", "L"][i], // Assign keybinds
					fishImage: fishImages[i % fishImages.length], // Assign fish images
				}))
			);
			console.log("Players initialized:", players);
		}
	}, [numPlayers]); // Runs when numPlayers updates

	// fish size
	const FISH_SIZE = 75;
	const MAX_FISH_SIZE = 200; // Cap size of fish

	// keybinds for up to 4 players
	const keybinds = ["A", "F", "J", "L"].slice(0, numPlayers);

	const [currentPlayerIndex, setCurrentPlayerIndex] = useState(-1);
	const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
	const [showOptions, setShowOptions] = useState(false);
	const [feedback, setFeedback] = useState<string | null>(null);
	const [incorrectAnswers, setIncorrectAnswers] = useState<Record<number, string[]>>({});
	const [specialMessage, setSpecialMessage] = useState<string | null>(null);
	const [questionLocked, setQuestionLocked] = useState(false); // 


	// For navigation to the feedback page
	const router = useRouter();

	// filter questions based on category
	const selectedCategory = gameSettings.category;

	const filteredQuestions: Question[] =
		selectedCategory === "All Categories" || !selectedCategory
			? questions
			: questions.filter((q) => q.category === selectedCategory);

	// Function to get a random question from the filtered list
	const getRandomQuestion = (): Question | null => {
		if (filteredQuestions.length === 0) return null; // Handle case where no questions match
		const randomIndex = Math.floor(Math.random() * filteredQuestions.length);
		return filteredQuestions[randomIndex];
	};

	// Set the first question
	useEffect(() => {
		setCurrentQuestion(getRandomQuestion());
	}, []);

	// save the game results
	const saveGameResults = () => {
		const gameResults = {
			players: players.map(player => ({
				id: player.id, // Keep track of player ID
				score: player.score, // Store score
				fishSize: Math.min(FISH_SIZE * player.score, MAX_FISH_SIZE), // Calculate fish size
				key: player.key, // Store key
				fishImage: player.fishImage.src, // Store fish image
				incorrectQuestions: incorrectAnswers[player.id] || [], // Store wrong questions
			})),
			fishPositions: fishPositions,
		};

		localStorage.setItem("gameResults", JSON.stringify(gameResults));
	};

	// timer countdown 
	useEffect(() => {
		if (timer === Infinity) return; // Don't start the timer in Zen mode

		const timerInterval = setInterval(() => {
			setTimer((prev) => {
				if (prev <= 1) {
					clearInterval(timerInterval);
					saveGameResults(); // Save results before redirecting
					router.push("/feedback");
				}
				return prev - 1;
			});
		}, 1000);

		return () => clearInterval(timerInterval);
	}, [router, timer]);


	// Handle player key press
	useEffect(() => {
		const handleKeyDown = (event: KeyboardEvent) => {
			const keyPressed = event.key.toUpperCase(); // Match defined keybinds
			if (keybinds.includes(keyPressed)) {
				handleAnswer(keyPressed);
			}
		};

		window.addEventListener("keydown", handleKeyDown);
		return () => window.removeEventListener("keydown", handleKeyDown);
	}, [players, keybinds, questionLocked]);


	// show options
	const handleAnswer = (key: string) => {
		if (questionLocked) {
			return; // prevent another player from answering
		}

		playBuzzerSound(); // Play buzzer sound
		const playerIndex = players.findIndex(p => p.key === key);
		if (playerIndex !== -1) {
			setCurrentPlayerIndex(playerIndex);
			setShowOptions(true);
			setQuestionLocked(true); // Lock question for this player
		}
	};

	// Handle answer selection
	const handleOptionClick = (selectedOption: string) => {
		if (!currentQuestion) return;

		const isCorrect = selectedOption === currentQuestion.correctAnswer;
		setFeedback(isCorrect ? "Correct!" : "Incorrect!");
		// Play sound based on correctness
		isCorrect ? playCorrectSound() : playIncorrectSound();

		// Update player scores and streaks
		setPlayers(prevPlayers =>
			prevPlayers.map((p, index) => {
				if (index === currentPlayerIndex) {
					const newStreak = isCorrect ? p.streak + 1 : 0; // Reset if incorrect

					// Check streak milestone within the update
					if (newStreak % 3 === 0 && newStreak !== 0) {
						const messages = [
							`Fish ${p.key} is making waves!`,
							`Watch out! Fish ${p.key} is growing!`,
							`Fish ${p.key} is pondering!`,
							`Fish ${p.key} knows their stuff!`
						];
						setSpecialMessage(messages[Math.floor(Math.random() * messages.length)]);
					} else {
						setSpecialMessage(null)
					}

					return {
						...p,
						score: isCorrect ? p.score + 0.1 : p.score, // Increase by 0.1
						streak: newStreak,
					};
				}
				return p;
			})
		);

		// Track incorrect answers
		if (!isCorrect) {
			setIncorrectAnswers(prev => ({
				...prev,
				[currentPlayerIndex]: [...(prev[currentPlayerIndex] || []), currentQuestion.question],
			}));
			console.log(`Player ${players[currentPlayerIndex]?.key} added to incorrect answers.`);
		}

		setTimeout(() => {
			setFeedback(null);
			setCurrentQuestion(getRandomQuestion());
			setShowOptions(false);
			setCurrentPlayerIndex(-1);
			setQuestionLocked(false); // Unlock for the next question
		}, 1000);
	};

	return (
		<div className="relative h-screen w-full flex items-center justify-center">
			<Image
				src={backgroundImage}
				alt="Background"
				fill
				quality={100}
				className="z-[-1] object-cover"
			/>

			<div className="flex space-x-4">
				<div className="w-[400px] h-[310px] overflow-hidden relative">
					<Image src={tankImage} alt="Tank" fill quality={100} className="object-cover" />

					<div className="absolute top-3 left-6 text-2xl text-white font-peaberry">
						Time left: {timer === Infinity ? "Zen Mode" : `${Math.floor(timer / 60)}:${String(timer % 60).padStart(2, "0")}`}
					</div>

					{players.map((player, index) => (
						<div key={index}
							style={{
								position: "absolute",
								top: `${fishPositions[index]?.top}%`,
								left: `${fishPositions[index]?.left}%`,
								width: `${Math.min(FISH_SIZE * player.score, MAX_FISH_SIZE)}px`,
								height: `${Math.min(FISH_SIZE * player.score, MAX_FISH_SIZE)}px`,
								display: "flex",
								flexDirection: "column",
								alignItems: "center",
								justifyContent: "center",
								transition: "width 0.5s ease", // Smooth transition for size change
							}}
							className="fish-container"
						>
							<Image
								src={player.fishImage}
								alt={`Fish ${index + 1}`}
								width={Math.min(FISH_SIZE * player.score, MAX_FISH_SIZE)}
								height={Math.min(FISH_SIZE * player.score, MAX_FISH_SIZE)}
								quality={100}
								className={`${currentPlayerIndex === index ? "winner-fish-container" : ""} fish-bob`}
							/>

							<span
								className={`text-white text-lg font-peaberry bg-[#6D835A] px-2 rounded opacity-80 mt-[-20px]`}
							>
								{player.key}
							</span>
						</div>
					))}


					<style>
						{`
							@keyframes bob {
								0%, 100% { transform: translateY(0); }
								50% { transform: translateY(-10px); }
							}
							.fish-container {
								animation: bob 2s infinite ease-in-out;
							}
							
							@keyframes spin {
								0% { transform: rotate(0deg); }
								100% { transform: rotate(360deg); }
							}

							.winner-fish-container {
								animation: spin 2s linear infinite;
							}
						`}
					</style>


				</div>
				<div className="relative flex w-[350px] h-[610px] flex-col justify-between ">
					<Image
						src={windowLong}
						alt="Window Long"
						className="object-cover"
						quality={100}
					/>
					<h1 className="absolute top-3 left-7 text-2xl text-white font-peaberry">
						{currentQuestion?.category}
					</h1>

					<div className="absolute top-0 bottom-0 left-0 right-0 flex flex-col items-center justify-center ">
						{feedback ? (
							<div className="p-4 text-center text-3xl text-[#684619] font-peaberry">
								{feedback}
							</div>
						) : (
							<>
								<div className="p-4 w-full text-center text-2xl text-[#684619] font-peaberry overflow-hidden flex items-center justify-center">
									{currentQuestion?.question}
								</div>
							</>
						)}

						{showOptions && !feedback ? (
							<div className="flex flex-col space-y-4">
								{currentQuestion?.options.map((option: string, index: number) => (
									<button
										key={index}
										onClick={() => handleOptionClick(option)}
										className="w-[300px] p-2 bg-[#6D835A] text-xl text-[#ffffff] font-peaberry rounded-lg hover:bg-[#4b5c3c] cursor-pointer hover:scale-110 transition-transform"
									>
										{option}
									</button>
								))}
							</div>
						) : !feedback ? (
							<div className="flex flex-wrap justify-center gap-4">
								<div className=" text-xl text-[#856336] font-peaberry text-center">
									{specialMessage || "Tap your letter to buzz in!"}
								</div>
							</div>
						) : null}

					</div>

					{timer === Infinity && (
						<div className="absolute bottom-7 left-0 right-0 flex justify-center">	
							<Image
								src={doneImage}
								alt="Done button"
								className="cursor-pointer h-full w-[150px] hover:scale-105 transition-transform"
								onClick={() => {
									saveGameResults();
									router.push("/feedback");
								}}
							/>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}
