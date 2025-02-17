"use client";

import Image from "next/image";
import Link from "next/link";
import backgroundImage from "../../assets/bg_dim.png";
import windowSquare from "../../assets/window_square.png";
import buttonBack from "../../assets/btn_back.png";
import githubImage from "../../assets/github.png";
import linkedinImage from "../../assets/linkedin.png";
import windowSocials from "../../assets/window_socials.png";

// Links for team members
const teamLinks = [
	{
		name: "Aye Thu",
		linkedin: "https://www.linkedin.com/in/ayemyatthu04/",
		github: "https://github.com/ayepricots",
	},
	{
		name: "Richman Tan",
		linkedin: "https://www.linkedin.com/in/richman-tan-9961442b1/",
		github: "https://github.com/Richman-Tan",
	},
	{
		name: "Ivory Huang",
		linkedin: "https://www.linkedin.com/in/ivoha/",
		github: "https://github.com/ivoha",
	},
];

export default function About() {
	return (
		<div className="relative h-screen w-full flex items-center justify-center">
			{/* Background Image */}
			<Image
				src={backgroundImage}
				alt="Background"
				fill
				quality={100}
				className="z-[-1] object-cover"
			/>

			{/* Main Content Wrapper */}
			<div className="relative flex md:flex-row items-center justify-center gap-6">
				{/* Main Window */}
				<div className="relative w-[400px] md:w-[600px] flex justify-center">
					<h1 className="absolute top-4 left-5 md:top-6 md:left-7 text-xl md:text-4xl text-white font-peaberry">
						About us
					</h1>

					<Image
						src={windowSquare}
						alt="Window Square"
						className="w-[400px] md:w-[600px]"
						quality={100}
					/>

					<div className="absolute top-20 md:top-32 flex justify-center flex-col w-[340px] md:w-[500px] overflow-visible">
						<div className="text-center md:text-2xl space-y-5 text-yellow-900 font-peaberry overflow-y-auto max-h-[260px] md:max-h-[380px] scrollable-container">
							<p>
								Pond Ponder is a summer project developed by the Powerpuff
								People team: Aye Thu, Richman Tan, and Ivory Huang.
							</p>
		
							<p>
								As second-year developers, we wanted to create a fun and
								engaging trivia game to help future students practice
								Object-Oriented Programming (OOP) concepts.
							</p>
							<p>
								 All art is original. We hope you enjoy our fishies!
								</p>
							<p>Special thanks to Nasser for his guidance and supervision throughout the project!</p>
						</div>

						{/* Back Button */}
						<div className="mt-4 md:mt-6 flex justify-center">
							<Link href="/">
								<Image
									src={buttonBack}
									alt="Back Button"
									className="cursor-pointer hover:scale-110 transition-transform w-[90px] md:w-[160px]"
									quality={100}
								/>
							</Link>
						</div>
					</div>
				</div>

				{/* Socials Window */}
				<div className="relative flex justify-center">
					<h1 className="absolute top-2 left-4 md:top-3 md:left-5 text-lg md:text-2xl text-white font-peaberry">
						Follow us
					</h1>
					<Image
						src={windowSocials}
						alt="Socials Window"
						className="w-[300px] md:w-[400px]"
						quality={100}
					/>

					<div className="absolute top-14 md:top-20 flex flex-col items-center">
						{/* Social Links */}
						<div className="mt-3 flex flex-col items-center text-yellow-900 font-peaberry text-center md:text-2xl">
							{teamLinks.map((member) => (
								<div key={member.name} className="mt-3 flex items-center space-x-3">
									<span className="font">{member.name}</span>
									<a href={member.linkedin} target="_blank" rel="noopener noreferrer">
										<Image
											src={linkedinImage}
											alt={`${member.name} LinkedIn`}
											width={30}
											height={30}
											className="cursor-pointer hover:scale-110 transition-transform"
										/>
									</a>
									<a href={member.github} target="_blank" rel="noopener noreferrer">
										<Image
											src={githubImage}
											alt={`${member.name} GitHub`}
											width={30}
											height={30}
											className="cursor-pointer hover:scale-110 transition-transform"
										/>
									</a>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
