"use client"; // Add this line at the top of the file

import { useEffect, useState } from "react";
import Image from "next/image";
import backgroundImage from "../../assets/bg_dim.png";
import tankImage from "../../assets/window_tank.png";
import windowLong from "../../assets/window_long.png";

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
	fishPositions: any; // Adjust type based on your actual data
}

export default function Feedback() {
	const [gameResults, setGameResults] = useState<GameResults | null>(null);

	// Load gameResults from localStorage on client side
	useEffect(() => {
		const storedResults = localStorage.getItem("gameResults");
		if (storedResults) {
			setGameResults(JSON.parse(storedResults));
		}
	}, []);

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
				{/* Fish Display */}
				<div className="w-[400px] h-[310px] overflow-hidden relative">
					<Image src={tankImage} alt="Tank" fill className="object-cover" />

					{gameResults?.players?.map((player, index) => (
						<div
							key={player.id}
							className="absolute"
							style={{
								top: 100 + index * 50,
								left: 50 + index * 100,
								width: player.fishSize,
							}}
						>
							<Image
								src={player.fishImage}
								alt={`Player ${player.id} Fish`}
								quality={100}
								className="object-cover"
								width={player.fishSize}
								height={player.fishSize}
							/>
						</div>
					))}
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
					<div className="absolute top-0 bottom-0 left-0 right-0 flex flex-col items-center justify-center">
						<div className="p-4 w-full h-[500px] overflow-y-scroll text-2xl text-[#684619] font-peaberry">
							{gameResults?.players?.length ? (
								gameResults.players.map((player) => (
									<div
										key={player.id}
										className="mb-4 p-4 bg-white rounded-lg shadow-md text-[#684619]"
									>
										<img src={player.fishImage} alt="Fish" className="w-24 mb-4" />
										<h3 className="font-bold text-lg mb-4">Score: {player.score.toFixed(2)}</h3>
										<h3 className="font-bold text-lg mb-4">Fish Size: {player.fishSize.toFixed(2)}px</h3>
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
					</div>
				</div>
			</div>
		</div>
	);
}
