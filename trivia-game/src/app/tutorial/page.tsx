"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import backgroundImage from "@/assets/bg_dim.png";
import windowSquare from "@/assets/window_square.png";
import backButton from "@/assets/btn_back.png"; // Import Back button image

export default function TutorialPage() {
  const router = useRouter(); 

  return (
    <div className="relative w-screen h-screen flex flex-col items-center justify-center">
      {/* Background Image */}
      <Image
        src={backgroundImage}
        alt="Background"
        fill
        quality={100}
        className="z-[-1] object-cover"
      />

      {/* Video Container with Window Background */}
      <div className="relative flex items-center justify-center p-6">
        {/* Window Frame */}
        <Image
          src={windowSquare}
          alt="Window Frame"
          width={850}
          height={500}
          className="absolute"
        />

        {/* Video Inside the Frame */}
        <video
          controls
          autoPlay
          muted
          className="relative w-[43vw] h-[45vw] max-w-[750px] max-h-[400px] rounded-lg shadow-lg"
        >
          <source src="/assets/tutorial.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

{/* Back Button - Moves Further Down */}
<div
        className="absolute bottom-[-60px] flex justify-center w-full cursor-pointer hover:scale-110 transition-transform"
        onClick={() => router.push("/start")} // ✅ Navigates back to /start
      >
        <Image
          src={backButton}
          alt="Back"
          width={150} // Adjust size if needed
          height={40}
          quality={100}
        />
      </div>
    </div>
    </div>
  );
}
