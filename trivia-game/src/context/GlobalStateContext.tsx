"use client"; // Required for React state and context

import { createContext, useContext, useState } from "react";

interface GlobalStateContextType {
  selectedButton: string | null;
  setSelectedButton: (button: string) => void;
}

// Create the Context
const GlobalStateContext = createContext<GlobalStateContextType | undefined>(undefined);

// Hook to use the context
export const useGlobalState = () => {
  const context = useContext(GlobalStateContext);
  if (!context) {
    throw new Error("useGlobalState must be used within a GlobalStateProvider");
  }
  return context;
};

// Provider Component
export const GlobalStateProvider = ({ children }: { children: React.ReactNode }) => {
  const [selectedButton, setSelectedButton] = useState<string | null>(null);

  return (
    <GlobalStateContext.Provider value={{ selectedButton, setSelectedButton }}>
      {children}
    </GlobalStateContext.Provider>
  );
};
