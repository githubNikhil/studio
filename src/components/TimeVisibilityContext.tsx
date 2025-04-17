"use client";

import React, { createContext, useState, useContext, ReactNode } from 'react';

interface TimeVisibilityContextProps {
  showTime: boolean;
  toggleTimeVisibility: () => void;
}

const TimeVisibilityContext = createContext<TimeVisibilityContextProps | undefined>(undefined);

export const TimeVisibilityProvider = ({ children }: { children: ReactNode }) => {
  const [showTime, setShowTime] = useState(true);

  const toggleTimeVisibility = () => {
    setShowTime(prevShowTime => !prevShowTime);
  };

  return (
    <TimeVisibilityContext.Provider value={{ showTime, toggleTimeVisibility }}>
      {children}
    </TimeVisibilityContext.Provider>
  );
};

export const useTimeVisibility = () => {
  const context = useContext(TimeVisibilityContext);
  if (!context) {
    throw new Error("useTimeVisibility must be used within a TimeVisibilityProvider");
  }
  return context;
};
