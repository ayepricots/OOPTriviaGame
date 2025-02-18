"use client";

import React from "react";
import Image from "next/image";
import backgroundImage from "@/assets/bg_dim.png";
import windowSquare from "@/assets/window_square.png";

export default function TutorialPage() {
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
          width={850} // Adjust based on your design
          height={500}
          className="absolute"
        />
        <video
          controls
          autoPlay
          muted
          className="relative w-[43vw] h-[45vw] max-w-[750px] max-h-[400px] rounded-lg shadow-lg"
        >
          <source src="../assets/tutorial.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  );
}
