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
			<div className="relative w-[400px] md:w-[600px]">
				<Image
					src={windowSquare}
					alt="Window Square"
					className="w-[400px] md:w-[600px]"
					quality={100}
				/>
				<div className="absolute inset-x-0 transform flex flex-col space-y-4 md:space-y-8 bottom-16 md:bottom-20">
					<div className="flex justify-center">
						Hi, we are Powerpuff People
					</div>
				</div>
			</div>
		</div>
	);
};