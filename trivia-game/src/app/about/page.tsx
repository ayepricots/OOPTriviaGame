import Image from 'next/image';
import backgroundImage from '../../assets/bg_dim.png';
import windowSquare from '../../assets/window_square.png';

export default function About() {
	return (
		<div className="relative h-screen w-full flex items-center justify-center">
			<Image
				src={backgroundImage}
				alt="Background"
				fill
				quality={100}
				className="z-[-1] object-cover"
			/>
			<div className="relative w-[400px] md:w-[600px] flex justify-center">
				<Image
					src={windowSquare}
					alt="Window Square"
					className="w-[400px] md:w-[600px]"
					quality={100}
				/>
				<div className="absolute top-20 md:top-32 flex justify-center w-[320px] md:w-[500px] overflow-hidden">
					<p className="text-center text-lg md:text-3xl">
						Pond Ponder is a summer project developed by the Powerpuff People team—Aye Thu, Richman Tan, and Ivory Huang. As second-year developers, we wanted to create a fun and engaging trivia game to help future students practice the Object-Oriented Programming (OOP) concepts they learn in lectures. Special thanks to Nasser for his guidance and supervision throughout the project.
					</p>
				</div>
			</div>
		</div>
	);
};