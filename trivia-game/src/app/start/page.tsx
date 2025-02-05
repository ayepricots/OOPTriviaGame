"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; // Import Next.js router
import Image from "next/image";
import backgroundImage from "../../assets/bg_dim.png";
import tankImage from "../../assets/window_tank.png";
import btnAdd from "../../assets/btn_add.png";
import windowLong from "../../assets/window_long.png";
import fishImage from "../../assets/fish.jpeg";
import startImage from "../../assets/btn_start.png";

const GameStartPage: React.FC = () => {
  const router = useRouter(); // ✅ Initialize Router

  // State for game settings
  const [category, setCategory] = useState("debug");
  const [timeLimit, setTimeLimit] = useState("5min");
  const [fishPositions, setFishPositions] = useState<
    { top: number; left: number; size: number }[]
  >([]);

  // Load settings from localStorage if they exist
  useEffect(() => {
    const savedSettings = localStorage.getItem("gameSettings");
    if (savedSettings) {
      const { category, timeLimit, fishPositions } = JSON.parse(savedSettings);
      setCategory(category);
      setTimeLimit(timeLimit);
      setFishPositions(fishPositions);
    }
  }, []);

  // Save game settings to localStorage whenever they change
  useEffect(() => {
    const gameSettings = {
      category,
      timeLimit,
      fishPositions,
    };
    localStorage.setItem("gameSettings", JSON.stringify(gameSettings));
  }, [category, timeLimit, fishPositions]);

  // Function to handle adding players (fish)
  const handleAddPlayer = () => {
    setFishPositions((prev) => {
      if (prev.length >= 4) {
        return [];
      }
      return [
        ...prev,
        {
          top: Math.random() * 80,
          left: Math.random() * 80,
          size: Math.max(50, Math.random() * 100),
        },
      ];
    });
  };

  const handleStart = () => {
    // Save settings before navigation
    localStorage.setItem(
      "gameSettings",
      JSON.stringify({ category, timeLimit, fishPositions })
    );

    // Navigate to the game page (replace with your actual game page URL)
    router.push("/game");
  };

  return (
    <div className="relative flex items-center justify-center h-screen">
      {/* Keyframes Animation */}
      <style>
        {`
          @keyframes bob {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-10px); }
          }
          .fish-bob {
            animation: bob 2s infinite ease-in-out;
          }
        `}
      </style>

      {/* Background Image */}
      <Image src={backgroundImage} alt="Background" fill quality={100} className="z-[-1] object-cover" />

      {/* Main Container */}
      <div className="flex space-x-4">
        {/* Left Container: Tank Image */}
        <div className="bg-[#c8cfb2] rounded-lg p-0 shadow-lg w-[400px] h-[310px] border-[4px] border-[#848266] overflow-hidden relative">
          <Image src={tankImage} alt="Tank" fill className="object-cover" />
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
          style={{ backgroundImage: `url(${windowLong.src})` }}
        >
          {/* Dropdowns */}
          <div className="space-y-4 mt-20">
            {/* Category Dropdown */}
            <div className="flex flex-col">
              <label className="text-3xl font-peaberry mb-1 text-[#68461A]">Category</label>
              <div className="relative">
                <select
                  className="w-full bg-[#D9D9D9] text-[#68461A] px-4 py-2 border-[2px] border-[#4E4E4E] rounded-lg font-peaberry appearance-none text-xl"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value="oop-basics">OOP Basics</option>
                  <option value="encapsulation">Encapsulation</option>
									<option value="inheritance">Inheritance</option>
									<option value="polymorphism">Polymorphism</option>
									<option value="design-patterns">Design Patterns</option>

                </select>
                <div className="absolute inset-y-0 right-2 flex items-center pointer-events-none">
                  <span className="text-[#4E4E4E] font-bold">&#x25BC;</span>
                </div>
              </div>
            </div>

            {/* Time Limit Dropdown */}
            <div className="flex flex-col">
              <label className="font-peaberry mb-1 text-[#68461A] text-3xl">Time limit</label>
              <div className="relative">
                <select
                  className="w-full bg-[#D9D9D9] text-[#68461A] px-4 py-2 border-[2px] border-[#4E4E4E] rounded-lg font-peaberry appearance-none text-xl"
                  value={timeLimit}
                  onChange={(e) => setTimeLimit(e.target.value)}
                >
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
            <span className="font-peaberry text-[#68461A] text-3xl">Players: {fishPositions.length}/4</span>
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
