import { useState } from "react";

const categories = [
	{ label: "All Categories ☝️", value: "All Categories" },
	{ label: "OOP Basics 🏗️", value: "OOP Basics" },
	{ label: "Encapsulation 🔒", value: "Encapsulation" },
	{ label: "Inheritance 🧬", value: "Inheritance" },
	{ label: "Polymorphism 🎭", value: "Polymorphism" },
	{ label: "Design Patterns 🏛️", value: "Design Patterns" },
];

interface CategoryDropdownProps {
	value: string;
	onChange: (value: string) => void;
}

export default function CategoryDropdown({ value, onChange }: CategoryDropdownProps) {
	const [open, setOpen] = useState(false);
	const selectedLabel = categories.find((item) => item.value === value)?.label

	const playClickSound = () => {
		const clickAudio = new Audio('/audio/click.wav');
		clickAudio.play();
	};

	return (
		<div className="relative w-full">
			<div
				className="w-full bg-[#d6cdc2] text-[#68461A] px-4 py-2 border-[2px] border-[#68461A] rounded-lg font-peaberry text-xl cursor-pointer flex justify-between items-center"
				onClick={() => {
					setOpen(!open);
					playClickSound();
				}}
			>
				{selectedLabel}
				<span className="text-[#4E4E4E] font-bold">&#x25BC;</span>
			</div>
			{open && (
				<div className="absolute w-full font-peaberry bg-[#d6cdc2] border-[2px] border-[#68461A] rounded-lg mt-1 shadow-lg z-10">
					{categories.map((item) => (
						<div
							key={item.value}
							className="px-4 py-2 text-[#68461A] text-xl hover:bg-[#b4a89a] cursor-pointer"
							onClick={() => {
								onChange(item.value);
								setOpen(false);
								playClickSound();
							}}
						>
							{item.label}
						</div>
					))}
				</div>
			)}
		</div>
	);
}
