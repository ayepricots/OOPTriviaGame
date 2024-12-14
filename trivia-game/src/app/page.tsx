import Image from 'next/image';
import Link from 'next/link';
import backgroundImage from '../assets/bg_dim.png';
import windowSquareAndTitle from '../assets/window_square_and_title.png';
import playBtn from '../assets/txt_play.png';
import aboutBtn from '../assets/txt_aboutus.png';

export default function Home() {
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
					src={windowSquareAndTitle}
					alt="Window Square and Title"
					className="w-[400px] md:w-[600px]"
					quality={100}
				/>
				<div className="absolute inset-x-0 transform flex flex-col space-y-4 md:space-y-8 bottom-16 md:bottom-20">
					<div className="flex justify-center">
						<Link href="/game">
							<Image
								src={playBtn}
								alt="Play Button"
								className="cursor-pointer w-[150px] md:w-[250px] hover:brightness-75"
								quality={100}
							/>
						</Link>
					</div>
					<div className="flex justify-center">
						<Link href="/about">
							<Image
								src={aboutBtn}
								alt="About Button"
								className="cursor-pointer w-[200px] md:w-[300px] hover:brightness-75"
								quality={100}
							/>
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
}
