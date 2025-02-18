import Image from "next/image";
import backgroundImage from "@/assets/bg_dim.png";
import tankImage from "@/assets/window_tank.png";
import windowLong from "@/assets/window_long.png";
import fish1 from "@/assets/fish_1_win.png";
import fish2 from "@/assets/fish_1.png";

interface Question {
	category: string;
	question: string;
	options: string[];
	correctAnswer: string;
}

export default function Feedback() {
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

					<div className="absolute top-28 left-20 w-[120px]">
						<Image
							src={fish1}
							alt="fish1"
							quality={100}
							className="object-cover"
						/>
					</div>
					<div className="absolute top-28 left-60 w-[90px]">
						<Image
							src={fish2}
							alt="fish2"
							quality={100}
							className="object-cover"
						/>
					</div>
				</div>
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
							{questionsPool.map((question, index) => (
								<div
									key={index}
									className="mb-4 p-4 bg-white rounded-lg shadow-md text-[#684619]"
								>
									<h3 className="font-bold text-lg mb-2">{question.category}</h3>
									<p className="text-md mb-1">{question.question}</p>
									<p className="text-sm font-semibold">
										Correct Answer: {question.correctAnswer}
									</p>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
