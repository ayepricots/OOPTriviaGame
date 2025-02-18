"use client"; // Add this line at the top of the file

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import backgroundImage from "@/assets/bg_dim.png";
import tankImage from "@/assets/window_tank.png";
import windowLong from "@/assets/window_long.png";
import playImage from "@/assets/btn_play.png";
import quitImage from "@/assets/btn_quit.png";

interface Player {
	id: string;
	score: number;
	fishSize: number;
	key: string;
	fishImage: string;
	incorrectQuestions: string[];
}

interface GameResults {
	players: Player[];
		fishPositions: any[]; // Adjust type based on your actual data
}

interface Question {
	category: string;
	question: string;
	options: string[];
	correctAnswer: string;
}

export default function Feedback() {
	const [gameResults, setGameResults] = useState<GameResults | null>(null);
	const [largestFishIndices, setLargestFishIndices] = useState<number[]>([]);

	useEffect(() => {
		const music = new Audio('/audio/its_not_showtime.wav');
		music.loop = true; // Loop the music
		music.volume = 0.3; // Adjust volume as needed
		music.play();

		return () => {
			music.pause();
			music.currentTime = 0; // Reset audio when leaving page
		};
	}, []);

	// click sound
	const playClickSound = () => {
		const clickAudio = new Audio('/audio/click.wav');
		clickAudio.play();
	}

	// Load gameResults from localStorage on client side
	useEffect(() => {
		const storedResults = localStorage.getItem("gameResults");
		if (storedResults) {
			const parsedResults: GameResults = JSON.parse(storedResults);

			// Remove duplicate incorrect questions for each player
			const updatedResults = {
				...parsedResults,
				players: parsedResults.players.map((player) => ({
					...player,
					incorrectQuestions: [...new Set(player.incorrectQuestions)], // Remove duplicates
				})),
			};

			setGameResults(updatedResults);
		}
	}, []);
	
	// Find largest fish(s) and store their index
	useEffect(() => {
		if (gameResults?.players?.length) {
			let largestFishSize = Math.max(...gameResults.players.map((player) => player.fishSize));
			let winners = gameResults.players
				.map((player, index) => (player.fishSize === largestFishSize ? index : -1))
				.filter((index) => index !== -1);
			setLargestFishIndices(winners);
		}
	}, [gameResults]); // Run this effect only when gameResults is updated
	

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

					{gameResults?.players?.length ? (
						gameResults.players.map((player, index) => (
						<div key={index}
							style={{
								position: "absolute",
								top: `${gameResults.fishPositions[index]?.top}%`,
								left: `${gameResults.fishPositions[index]?.left}%`,
								width: `${gameResults.players[index].fishSize}px`,
								height: `${gameResults.players[index].fishSize}px`,
								display: "flex",
								flexDirection: "column",
								alignItems: "center",
								justifyContent: "center",
								transition: "width 0.5s ease", // Smooth transition for size change
							}}
							className={largestFishIndices.includes(index) ? "winner-fish-container" : "fish-container"}
						>
							<Image
								src={player.fishImage}
								alt={`Fish ${index + 1}`}
								width={gameResults.players[index].fishSize}
								height={gameResults.players[index].fishSize}
								quality={100}
								className="fish-bob"
							/>
							{largestFishIndices.includes(index) && (
								<p className="win-text mt-2 text-white text-xl font-peaberry">WINNER</p>
							)}
						</div>
					))
					) : (
						<p className="text-center text-lg text-white">No game results found.</p>
					)}


					<style>
						{`
							@keyframes bob {
								0%, 100% { transform: translateY(0); }
								50% { transform: translateY(-10px); }
							}

							@keyframes spin {
								0% { transform: rotate(0deg); }
								100% { transform: rotate(360deg); }
							}

							@keyframes flashRainbow {
    							0% { color: #ffadad; }   /* Soft Red */
    							16% { color: #ffd6a5; }  /* Pastel Orange */
    							33% { color: #fdffb6; }  /* Light Yellow */
   								50% { color: #caffbf; }  /* Soft Green */
 								66% { color: #9bf6ff; }  /* Light Blue */
    							83% { color: #a0c4ff; }  /* Soft Indigo */
    							100% { color: #bdb2ff; } /* Light Purple */
							}
							
							@keyframes expandShrink {
    							0%, 100% { transform: scale(1); }   /* Normal Size */
    							50% { transform: scale(1.3); }      /* Slightly Bigger */
							}

							.fish-container {
								animation: bob 2s infinite ease-in-out;
							}

							/* Apply spinning animation to winner fish(s) */
							.winner-fish-container {
								animation: spin 2s linear infinite;
							}

							.win-text {
								animation: flashRainbow 0.75s infinite linear,
											expandShrink 0.75s infinite ease-in-out;
								font-weight: bold;
							}
						`}
					</style>


				</div>

				{/* Feedback Display */}
				<div className="relative flex w-[350px] h-[610px] flex-col justify-between ">
					<Image
						src={windowLong}
						alt="Window Long"
						className="object-cover"
						quality={100}
					/>

					<h1 className="absolute top-3 left-4 text-2xl text-white font-peaberry">
						Feedback
					</h1>
					<div className="mt-14 mr-1 absolute top-0 bottom-0 left-0 right-0 flex flex-col items-center">
						<div className=" p-4 w-full h-[460px] overflow-y-scroll text-2xl text-[#684619] font-peaberry">
							{gameResults?.players?.length ? (
								gameResults.players.map((player) => (
									<div
										key={player.id}
										className="mb-4 p-4 bg-white rounded-lg shadow-md text-[#684619]"
									>
										<img src={player.fishImage} alt="Fish" className="w-24 mb-4" />
										<h3 className="font-bold text-lg mb-4">Fish Size: {player.fishSize.toFixed(1)}px</h3>
										<h4 className="font-bold mt-6">Incorrect Questions:</h4>
										<ul className="list-disc list-inside text-base">
											{player.incorrectQuestions.length > 0 ? (
												player.incorrectQuestions.map((question, qIndex) => (
													<li className="mt-4" key={qIndex}>{question}</li>
												))
											) : (
												<p className="text-green-600">Perfect Score!</p>
											)}
										</ul>
									</div>
								))
							) : (
								<p className="text-center text-lg text-white">No game results found.</p>
							)}
						</div>
						<div className = "flex mt-5">
							<Link href="/start">
								<Image 
								src={playImage} 
								alt="Play Button" 
								className="cursor-pointer h-[45px] w-full hover:scale-105 transition-transform" 
								onClick={playClickSound}
								/>
							</Link>
							<Link href="/">
								<Image 
								src={quitImage} 
								alt="Quit Button" 
								className="ml-2 cursor-pointer hover:scale-105 transition-transform h-[45px] w-full" 
								onClick={playClickSound}
								/>
							</Link>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
