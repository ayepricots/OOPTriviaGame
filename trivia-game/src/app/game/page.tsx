"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import backgroundImage from '../../assets/bg_dim.png';
import tankImage from '../../assets/window_tank.png';
import windowLong from '../../assets/window_long.png';

export default function Game() {
	// State to manage the current question
	const [currentQuestion, setCurrentQuestion] = useState('');
	const questionsPool = [
		'What is the capital of France?',
		'What is 2 + 2?',
		'Name the largest planet in the solar system.',
		'What year did the Titanic sink?',
		'Who wrote "Romeo and Juliet"?',
	];

	// Function to get a random question
	const getRandomQuestion = () => {
		const randomIndex = Math.floor(Math.random() * questionsPool.length);
		return questionsPool[randomIndex];
	};

	// Initialize with a random question
	useEffect(() => {
		setCurrentQuestion(getRandomQuestion());
	}, []);

	// Function to handle button press
	const handleAnswer = () => {
		alert(`You answered the question: "${currentQuestion}"`);
		// Get a new random question after answering
		setCurrentQuestion(getRandomQuestion());
	};

	// Handle keybind (Enter key to simulate button press)
	useEffect(() => {
		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key === 'Enter') {
				handleAnswer();
			}
		};
		window.addEventListener('keydown', handleKeyDown);

		// cleanup the event listener on component unmount
		return () => {
			window.removeEventListener('keydown', handleKeyDown);
		};
	}, [currentQuestion]);

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
					<Image
						src={tankImage}
						alt="Tank"
						fill
						className="object-cover"
					/>
				</div>
				<div className="relative flex justify-center w-[350px] h-[610px] flex flex-col justify-between relative">
					<Image
						src={windowLong}
						alt="Window Long"
						className="object-cover"
						quality={100}
					/>

					<div className="absolute top-24 bottom-24 flex flex-col items-center">
						<div className="p-4 w-full text-center text-2xl text-[#684619] font-peaberry overflow-hidden">
							{currentQuestion}
						</div>

						<button
							onClick={handleAnswer}
							className="w-[100px] h-[100px] bg-[#ACD7C6] text-2xl text-[#684619] font-peaberry mt-auto mb-4"
						>
							enter
						</button>

					</div>
				</div>
			</div>
		</div>
	);
}
