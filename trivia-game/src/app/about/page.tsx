import Image from 'next/image';
import Link from 'next/link';
import backgroundImage from '../../assets/bg_dim.png';
import windowSquare from '../../assets/window_square.png';
import buttonBack from '../../assets/btn_back.png';

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
				<h1 className="absolute top-4 left-5 md:top-6 md:left-7 text-xl md:text-4xl text-white font-peaberry">
					About us
				</h1>
				<Image
					src={windowSquare}
					alt="Window Square"
					className="w-[400px] md:w-[600px]"
					quality={100}
				/>
				<div className="absolute top-20 md:top-32 flex justify-center flex-col w-[340px] md:w-[500px] overflow-hidden">
					<div className="text-center md:text-2xl text-yellow-900 font-peaberry overflow-y-auto max-h-[260px] md:max-h-[380px]">
						<div>
							<p>
								Pond Ponder is a summer project developed by the Powerpuff People team—Aye Thu, Richman Tan, and Ivory Huang.
							</p>
							<p>
								As second-year developers, we wanted to create a fun and engaging trivia game to help future students practice the Object-Oriented Programming (OOP) concepts they learn in lectures.
							</p>
							<p>
								Special thanks to Nasser for his guidance and supervision throughout the project.
							</p>
						</div>
						<div className="mt-4">
							<p>
								Aye Thu - <a href="https://www.linkedin.com/in/ayemyatthu04/" className="text-blue-600 hover:underline">LinkedIn</a> | <a href="https://github.com/ayepricots" className="text-blue-600 hover:underline">GitHub</a>
							</p>
							<p>
								Richman Tan - <a href="https://www.linkedin.com/in/richman-tan-9961442b1/" className="text-blue-600 hover:underline">LinkedIn</a> | <a href="https://github.com/Richman-Tan" className="text-blue-600 hover:underline">GitHub</a>
							</p>
							<p>
								Ivory Huang - <a href="https://www.linkedin.com/in/ivoha/" className="text-blue-600 hover:underline">LinkedIn</a> | <a href="https://github.com/ivoha" className="text-blue-600 hover:underline">GitHub</a>
							</p>
						</div>
					</div>
					<div className="mt-4 md:mt-6  flex justify-center">
						<Link href="/">
							<Image
								src={buttonBack}
								alt="Back Button"
								className="cursor-pointer w-[90px] md:w-[160px] hover:brightness-50"
								quality={100}
							/>
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
};