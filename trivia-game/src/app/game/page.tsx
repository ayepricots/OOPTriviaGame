"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; // For navigation
import Image from "next/image";
import backgroundImage from "../../assets/bg_dim.png";
import tankImage from "../../assets/window_tank.png";
import windowLong from "../../assets/window_long.png";

interface Question {
	category: string;
	question: string;
	options: string[];
	correctAnswer: string;
}

export default function Game() {
	const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
	const [showOptions, setShowOptions] = useState(false);
	const [feedback, setFeedback] = useState<string | null>(null);
	const [timer, setTimer] = useState(30);
	const router = useRouter(); // For navigation to the feedback page

	const questionsPool: Question[] = [
		{
			category: "OOP Basics",
			question: "What does OOP stand for?",
			options: ["Object-Oriented Programming", "Open-Operation Protocol", "Object Operation Protocol", "Optimal Object Processing"],
			correctAnswer: "Object-Oriented Programming",
		},
		{
			category: "OOP Basics",
			question: "Which of the following is not a principle of OOP?",
			options: ["Encapsulation", "Polymorphism", "Abstraction", "Compilation"],
			correctAnswer: "Compilation",
		},
		{
			category: "Encapsulation",
			question: "Encapsulation is achieved using?",
			options: ["Classes", "Methods", "Attributes", "All of the above"],
			correctAnswer: "All of the above",
		},
		{
			category: "Inheritance",
			question: "What is inheritance in OOP?",
			options: [
				"Creating a new class from an existing class",
				"Copying attributes from one class to another",
				"Sharing data between two classes",
				"None of the above",
			],
			correctAnswer: "Creating a new class from an existing class",
		},
		{
			category: "Polymorphism",
			question: "Which type of polymorphism is achieved by method overloading?",
			options: ["Compile-time", "Run-time", "Dynamic", "None of the above"],
			correctAnswer: "Compile-time",
		},
		{
			category: "Design Patterns",
			question: "Which of these is a creational design pattern?",
			options: ["Singleton", "Observer", "Adapter", "Facade"],
			correctAnswer: "Singleton",
		},
		{
			category: "OOP Basics",
			question: "What keyword is used to create an object in Java?",
			options: ["new", "create", "object", "make"],
			correctAnswer: "new",
		},
		{
			category: "Inheritance",
			question: "In Java, which keyword is used to inherit a class?",
			options: ["extends", "implements", "inherits", "super"],
			correctAnswer: "extends",
		},
		{
			category: "Polymorphism",
			question: "Which of these allows overriding a method in a subclass?",
			options: ["Inheritance", "Encapsulation", "Abstraction", "None of the above"],
			correctAnswer: "Inheritance",
		},
	];

	const getRandomQuestion = (): Question => {
		const randomIndex = Math.floor(Math.random() * questionsPool.length);
		return questionsPool[randomIndex];
	};

	useEffect(() => {
		setCurrentQuestion(getRandomQuestion());
	}, []);

	useEffect(() => {
		const timerInterval = setInterval(() => {
			setTimer((prev) => {
				if (prev <= 1) {
					clearInterval(timerInterval);
					router.push("/feedback"); // Redirect to feedback page when timer reaches 0
				}
				return prev - 1;
			});
		}, 1000);

		return () => clearInterval(timerInterval);
	}, [router]);

	const handleAnswer = () => {
		setShowOptions(true);
	};

	const handleOptionClick = (selectedOption: string) => {
		if (!currentQuestion) return;
		const isCorrect = selectedOption === currentQuestion.correctAnswer;
		setFeedback(isCorrect ? "Correct!" : "Incorrect!");
		setTimeout(() => {
			setFeedback(null);
			setCurrentQuestion(getRandomQuestion());
			setShowOptions(false);
		}, 1000);
	};

	const handleEnterPress = () => {
		if (!showOptions) {
			handleAnswer();
		}
	};

	useEffect(() => {
		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key === "Enter") {
				handleEnterPress();
			}
		};
		window.addEventListener("keydown", handleKeyDown);

		return () => window.removeEventListener("keydown", handleKeyDown);
	}, [showOptions]);

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
					<Image src={tankImage} alt="Tank" fill className="object-cover" />
				</div>
				<div className="relative flex w-[350px] h-[610px] flex-col justify-between ">
					<Image
						src={windowLong}
						alt="Window Long"
						className="object-cover"
						quality={100}
					/>
					<h1 className="absolute top-3 left-7 text-2xl text-white font-peaberry">
						Time Left: {timer}s
					</h1>
					<div className="absolute top-0 bottom-0 left-0 right-0 flex flex-col items-center justify-center space-y-4">
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
										className="w-[250px] p-2 bg-[#ACD7C6] text-xl text-[#684619] font-peaberry rounded-lg hover:bg-[#89bca6] transition"
									>
										{option}
									</button>
								))}
							</div>
						) : !feedback ? (
							<button
								onClick={handleAnswer}
								className="w-[100px] h-[100px] bg-[#ACD7C6] text-2xl text-[#684619] font-peaberry"
							>
								Enter
							</button>
						) : null}
					</div>
				</div>
			</div>
		</div>
	);
}
