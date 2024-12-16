"use client";

import { useGlobalState } from "../../context/GlobalStateContext";

export default function Start() {
  const { selectedButton } = useGlobalState();

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold">
        You selected: {selectedButton || "None"}
      </h1>
    </div>
  );
}
