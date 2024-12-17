import Image from 'next/image';
import Link from 'next/link';
import backgroundImage from '../../assets/bg_dim.png';
import windowSquare from '../../assets/window_square.png';
import buttonBack from '../../assets/btn_start.png';

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
				<div className="absolute top-20 md:top-32 flex justify-center flex-col w-[340px] md:w-[500px] overflow-hidden">
					<p className="text-center text-base md:text-2xl">
						Pond Ponder is a summer project developed by the Powerpuff People team—Aye Thu, Richman Tan, and Ivory Huang. As second-year developers, we wanted to create a fun and engaging trivia game to help future students practice the Object-Oriented Programming (OOP) concepts they learn in lectures. Special thanks to Nasser for his guidance and supervision throughout the project.
					</p>
					<div className="mt-10 md:mt-14  flex justify-center">
						<Link href="/">
							<Image
								src={buttonBack}
								alt="Back Button"
								className="cursor-pointer w-[150px] md:w-[220px] hover:brightness-50"
								quality={100}
							/>
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
};