"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import backgroundImage from "@/assets/bg_dim.png";
import windowSquareAndTitle from "@/assets/window_square_and_title.png";
import playBtn from "@/assets/txt_play.png";
import aboutBtn from "@/assets/txt_aboutus.png";

export default function Home() {
	const [isMobile, setIsMobile] = useState(false);

	useEffect(() => {
		const checkScreenSize = () => {
			setIsMobile(window.innerWidth < 600); // Adjust width if needed
		};

		checkScreenSize();
		window.addEventListener("resize", checkScreenSize);
		return () => window.removeEventListener("resize", checkScreenSize);
	}, []);

	const playBubbleSound = () => {
		const bubbleAudio = new Audio("/audio/bubble.wav");
		bubbleAudio.play();
	};

	const playClickSound = () => {
		const clickAudio = new Audio("/audio/click.wav");
		clickAudio.play();
	};

	return (
		<div className="relative h-screen w-full flex items-center justify-center">
			<Image src={backgroundImage} alt="Background" fill quality={100} className="z-[-1] object-cover" />
			{isMobile && (
				<div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-80 flex flex-col items-center justify-center text-white text-center p-6 z-50">
					<p className="text-2xl font-bold mb-4 font-peaberry">⚠️</p>
					<p className="text-2xl font-bold mb-4 font-peaberry">Not Optimised for Mobile</p>
					<p className="text-lg font-peaberry">This game is best played on a desktop or laptop.</p>
					<p className="text-lg font-peaberry">Please switch to a larger screen for the best experience. 🐟</p>
				</div>
			)}

			{!isMobile && (
				<div className="relative w-[400px] md:w-[600px]">
					<h1 className="absolute top-4 left-5 md:top-6 md:left-7 text-xl md:text-4xl text-white font-peaberry">
						Softeng 281
					</h1>
					<Image src={windowSquareAndTitle} alt="Window Square and Title" className="w-[400px] md:w-[600px]" quality={100} />
					<div className="absolute inset-x-0 transform flex flex-col space-y-4 md:space-y-8 bottom-16 md:bottom-20">
						<div className="flex justify-center">
							<Link href="/start">
								<Image
									src={playBtn}
									alt="Play Button"
									className="cursor-pointer hover:scale-110 transition-transform w-[150px] md:w-[250px]"
									quality={100}
									onClick={playBubbleSound}
								/>
							</Link>
						</div>
						<div className="flex justify-center">
							<Link href="/about">
								<Image
									src={aboutBtn}
									alt="About Button"
									className="cursor-pointer hover:scale-110 transition-transform w-[200px] md:w-[300px]"
									quality={100}
									onClick={playClickSound}
								/>
							</Link>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}
