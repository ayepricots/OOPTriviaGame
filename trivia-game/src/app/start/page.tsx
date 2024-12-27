"use client";

import React, { useState } from "react";
import Image from "next/image";
import backgroundImage from "../../assets/bg_dim.png";
import tankImage from "../../assets/window_tank.png";
import btnAdd from "../../assets/btn_add.png";
import windowLong from "../../assets/window_long.png";
import fishImage from "../../assets/fish.jpeg";
import startImage from "../../assets/btn_start.png";

const GameStartPage: React.FC = () => {
  // State to track the positions and sizes of the fish
  const [fishPositions, setFishPositions] = useState<
    { top: number; left: number; size: number }[]
  >([]);

  // Function to handle the button click
  const handleAddPlayer = () => {
    setFishPositions((prev) => {
      // If 4 fish already exist, reset the positions (clear the tank)
      if (prev.length >= 4) {
        return [];
      }
      // Otherwise, add a new fish with a random position and size
      return [
        ...prev,
        {
          top: Math.random() * 80, // Generate random vertical position
          left: Math.random() * 80, // Generate random horizontal position
          size: Math.max(50, Math.random() * 100), // Random size with a minimum of 30px
        },
      ];
    });
  };

  // Function to handle the Start button click
  const handleStart = () => {
    alert("Game Started!");
  };

  return (
    <div className="relative flex items-center justify-center h-screen">
      {/* Add Keyframes Animation */}
      <style>
        {`
          @keyframes bob {
            0%, 100% {
              transform: translateY(0);
            }
            50% {
              transform: translateY(-10px);
            }
          }
          .fish-bob {
            animation: bob 2s infinite ease-in-out;
          }
        `}
      </style>

      {/* Background Image */}
      <Image
        src={backgroundImage}
        alt="Background"
        fill
        quality={100}
        className="z-[-1] object-cover"
      />

      {/* Main Container */}
      <div className="flex space-x-4">
        {/* Left Container: Tank Image */}
        <div className="bg-[#c8cfb2] rounded-lg p-0 shadow-lg w-[400px] h-[310px] border-[4px] border-[#848266] overflow-hidden relative">
          <Image
            src={tankImage}
            alt="Tank"
            fill
            className="object-cover"
          />
          {/* Fish Players */}
          <div className="absolute inset-0">
            {fishPositions.map((position, index) => (
              <Image
                key={index}
                src={fishImage}
                alt="Fish"
                width={position.size}
                height={position.size}
                className="absolute fish-bob"
                style={{
                  top: `${position.top}%`,
                  left: `${position.left}%`,
                }}
              />
            ))}
          </div>
        </div>

        {/* Right Container: Form */}
        <div
          className="rounded-lg p-4 shadow-lg w-[350px] h-[610px] border-[4px] border-[#848266] flex flex-col justify-between bg-cover bg-center relative"
          style={{
            backgroundImage: `url(${windowLong.src})`,
          }}
        >
          {/* Dropdowns */}
          <div className="space-y-4 mt-20">
            {/* Category Dropdown */}
            <div className="flex flex-col">
              <label className="text-3xl font-semibold mb-1 text-[#68461A]">Category</label>
              <div className="relative">
                <select className="w-full bg-[#D9D9D9] text-[#68461A] px-4 py-2 border-[2px] border-[#4E4E4E] rounded-lg font-mono appearance-none text-xl">
                  <option value="debug">Debug</option>
                  <option value="oop">OOP</option>
                </select>
                <div className="absolute inset-y-0 right-2 flex items-center pointer-events-none">
                  <span className="text-[#4E4E4E] font-bold">&#x25BC;</span>
                </div>
              </div>
            </div>

            {/* Time Limit Dropdown */}
            <div className="flex flex-col">
              <label className="font-semibold mb-1 text-[#68461A] text-3xl">Time limit</label>
              <div className="relative">
                <select className="w-full bg-[#D9D9D9] text-[#68461A] px-4 py-2 border-[2px] border-[#4E4E4E] rounded-lg font-mono appearance-none">
                  <option value="5min">5 min</option>
                  <option value="10min">10 min</option>
                </select>
                <div className="absolute inset-y-0 right-2 flex items-center pointer-events-none">
                  <span className="text-[#4E4E4E] font-bold">&#x25BC;</span>
                </div>
              </div>
            </div>
          </div>

          {/* Players Section */}
          <div className="flex items-center justify-between">
            <span className="font-semibold text-[#68461A] text-3xl">Players: {fishPositions.length}/4</span>
            <div className="w-[30px] h-[30px]" onClick={handleAddPlayer}>
              <Image
                src={btnAdd}
                alt="Add"
                width={55}
                height={55}
                className="cursor-pointer hover:scale-110 transition-transform"
              />
            </div>
          </div>

          {/* Start Button */}
          <div className="flex justify-center pb-4">
            <Image
              src={startImage}
              alt="Start Button"
              className="cursor-pointer hover:scale-105 transition-transform height-[200px] width-[200px]"
              onClick={handleStart}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameStartPage;
