"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; // Import Next.js router
import Image from "next/image";
import backgroundImage from "@/assets/bg_dim.png";
import tankImage from "@/assets/window_tank.png";
import btnAdd from "@/assets/btn_add.png";
import windowLong from "@/assets/window_long.png";
import fishImage from "@/assets/ayefish2.png";
import startImage from "@/assets/btn_start.png";
import ivoryfish from "@/assets/ivoryfish.png";
import ayefish from "@/assets/ayefish.png";
import richmanfish from "@/assets/richmanfish.png";
import topLeftImage from "@/assets/btn_tutorial.png";
import CategoryDropdown from "@/components/categoryDropdown";
import TimeDropdown from "@/components/timeDropdown";

const GameStartPage: React.FC = () => {
	const router = useRouter(); // ✅ Initialize Router

	const playClickSound = () => {
		const clickAudio = new Audio('/audio/click.wav');
		clickAudio.play();
	};

	const playBubbleSound = () => {
		const bubbleAudio = new Audio('/audio/bubble.wav');
		bubbleAudio.play();
	}

	// State for game settings
	const [category, setCategory] = useState("All Categories");
	const [timeLimit, setTimeLimit] = useState("5min");
	const fishTypes = [ivoryfish, fishImage, ayefish, richmanfish];


	const [fishPositions, setFishPositions] = useState<
		{ top: number; left: number; image: any }[]
	>([
		{ top: 20 + Math.random() * 50, left: 20 + Math.random() * 50, image: fishTypes[0] }, // Default fish
	]);

	// Load settings from localStorage if they exist
	useEffect(() => {
		const savedSettings = localStorage.getItem("gameSettings");
		if (savedSettings) {
			const { category, timeLimit, fishPositions } = JSON.parse(savedSettings);
			setCategory(category);
			setTimeLimit(timeLimit);
			setFishPositions(fishPositions);
		}
	}, []);

	// Save game settings to localStorage whenever they change
	useEffect(() => {
		const gameSettings = {
			category,
			timeLimit,
			fishPositions,
		};
		localStorage.setItem("gameSettings", JSON.stringify(gameSettings));
	}, [category, timeLimit, fishPositions]);

	// Function to check if a new fish overlaps with existing ones
	const isOverlapping = (top: number, left: number) => {
		return fishPositions.some(
			(fish) =>
				Math.abs(fish.top - top) < 20 && Math.abs(fish.left - left) < 20
		);
	};

	// Function to handle adding players (fish)
	const handleAddPlayer = () => {
		setFishPositions((prev) => {
			if (prev.length >= 4) {
				// Reset to 1 fish, but make sure it starts with fishTypes[1]
				return [{ top: 20 + Math.random() * 50, left: 20 + Math.random() * 50, image: fishTypes[0] }];
			}

			let newTop, newLeft;
			do {
				newTop = 20 + Math.random() * 50;
				newLeft = 20 + Math.random() * 50;
			} while (isOverlapping(newTop, newLeft));

			// Exclude fishTypes[0] from selection
			const availableFish = fishTypes.slice(1); // Use only fishTypes[1] to fishTypes[3]

			// Pick a unique fish image that hasn't been used
			const usedFish = prev.map((p) => p.image);
			const remainingFish = availableFish.filter((f) => !usedFish.includes(f));

			// Choose a new unique fish or cycle through available ones
			const newFishImage = remainingFish.length > 0
				? remainingFish[0] // Prioritize unique fish
				: availableFish[prev.length % availableFish.length]; // Cycle through fishTypes[1] to fishTypes[3]

			return [...prev, { top: newTop, left: newLeft, image: newFishImage }];
		});
	};


	const handleStart = () => {
		// Save settings before navigation
		localStorage.setItem(
			"gameSettings",
			JSON.stringify({ category, timeLimit, fishPositions })
		);

		// Navigate to the game page (replace with your actual game page URL)
		router.push("/game");
	};

	const handleTutorial = () => {
		// Navigate to the tutorial page (replace with your actual tutorial page URL)
		router.push("/tutorial");
	};

	return (
		<div className="relative flex items-center justify-center h-screen">
			{/* Keyframes Animation */}
			<style>
				{`
          @keyframes bob {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-10px); }
          }
          .fish-bob {
            animation: bob 2s infinite ease-in-out;
          }
        `}
			</style>

			{/* Background Image */}
			<Image
				src={backgroundImage}
				alt="Background"
				fill
				quality={100}
				className="z-[-1] object-cover"
			/>

			{/* Clickable Top-Left Image */}
			<div
					className="absolute top-4 left-4 w-[50px] h-[50px] cursor-pointer hover:scale-110 transition-transform"
					onClick={handleTutorial} // ✅ Clicking this image triggers handleTutorial
				>
					<Image
					src={topLeftImage}
					alt="Top Left Icon"
					width={80}
					height={80}
					quality={100}
					/>
				</div>

			{/* Main Container */}
			<div className="flex space-x-4">
				{/* Left Container: Tank Image */}
				<div className="rounded-lg p-0 shadow-lg w-[400px] h-[310px] overflow-hidden relative">
					<Image src={tankImage} alt="Tank" fill quality={100} className="object-cover" />
					{/* Fish Players */}
					<div className="absolute inset-0">
						{fishPositions.map((position, index) => (
							<Image
								key={index}
								src={position.image}
								alt="Fish"
								quality={100}
								className="absolute fish-bob"
								style={{
									top: `${position.top}%`,
									left: `${position.left}%`,
									width: "75px",
								}}
							/>
						))}
					</div>
				</div>

				{/* Right Container: Form */}
				<div
					className="rounded-lg p-4 shadow-lg w-[350px] h-[610px] flex flex-col justify-between bg-cover bg-center relative"
					style={{ backgroundImage: `url(${windowLong.src})` }}
				>
					{/* Dropdowns */}
					<div className="space-y-4 mt-20">
						{/* Category Dropdown */}
						<div className="relative">
							<div className="flex flex-col">
								<label className="text-3xl font-peaberry mb-1 text-[#68461A]">Category</label>
								<CategoryDropdown value={category} onChange={setCategory} />
							</div>
						</div>

						{/* Time Limit Dropdown */}
						<div className="relative">
							<div className="flex flex-col">
								<label className="font-peaberry mb-1 text-[#68461A] text-3xl">Time limit</label>
								<TimeDropdown value={timeLimit} onChange={setTimeLimit} />
							</div>
						</div>
					</div>

					{/* Players Section */}
					<div className="flex items-center justify-between">
						<span className="font-peaberry text-[#68461A] text-3xl">
							Players: {fishPositions.length}/4
						</span>
						<div className="w-[30px] h-[30px]" onClick={() => {
							handleAddPlayer();
							playClickSound();
						}}>
							<Image
								src={btnAdd}
								alt="Add"
								width={55}
								height={55}
								quality={100}
								className="cursor-pointer hover:scale-110 transition-transform"
							/>
						</div>
					</div>

					{/* Start Button */}
					<div className="flex justify-center pb-4">
						<Image
							src={startImage}
							alt="Start Button"
							quality={100}
							className="cursor-pointer hover:scale-105 transition-transform height-[200px] width-[200px]"
							onClick={() => {
								handleStart();
								playBubbleSound();
							}}
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default GameStartPage;
