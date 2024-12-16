"use client";

import { useGlobalState } from "../../context/GlobalStateContext";
import Image from "next/image";
import Link from "next/link";
import backgroundImage from "../../assets/bg_dim.png";
import debugIcon from "../../assets/icon_debug.png";
import oopIcon from "../../assets/icon_oop.png";

export default function Categories() {
  const { setSelectedButton } = useGlobalState();

  const handleClick = (button: string) => {
    setSelectedButton(button); // Store the clicked button in the global state
  };

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

      {/* Title */}
      <div className="absolute top-10 left-10">
        <h1 className="text-[#68461A] text-4xl font-bold font-pixel">
          Choose Your Category
        </h1>
      </div>

      {/* Debug Icon Button */}
      <div className="absolute right-10 top-20 md:right-16 lg:right-20 transition-all duration-300">
        <Link href="/start">
          <button
            className="transform transition-transform hover:scale-110 focus:scale-110"
            onClick={() => handleClick("debug")}
          >
            <Image
              src={debugIcon}
              alt="Debug Icon"
              width={150}
              height={150}
              className="md:w-[200px] md:h-[200px] lg:w-[300px] lg:h-[300px]"
            />
          </button>
        </Link>
      </div>

      {/* OOP Icon Button */}
      <div className="absolute right-10 top-[225px] md:right-16 md:top-[300px] lg:right-20 lg:top-[400px] transition-all duration-300">
        <Link href="/start">
          <button
            className="transform transition-transform hover:scale-110 focus:scale-110"
            onClick={() => handleClick("oop")}
          >
            <Image
              src={oopIcon}
              alt="OOP Icon"
              width={150}
              height={150}
              className="md:w-[200px] md:h-[200px] lg:w-[300px] lg:h-[300px]"
            />
          </button>
        </Link>
      </div>
    </div>
  );
}
