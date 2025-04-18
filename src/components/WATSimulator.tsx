"use client";

import React, { useState, useEffect } from "react";
import { useTimeVisibility } from "@/components/TimeVisibilityContext";

const words = [
  "happy", "sad", "tree", "sky", "book", "run", "jump", "blue", "red", "fast",
  "slow", "work", "play", "home", "cold", "hot", "dark", "light", "good", "bad",
  "war", "peace", "love", "hate", "life", "dead", "rich", "poor", "hard", "easy",
  "true", "false", "clean", "dirty", "loud", "quiet", "thick", "thin", "high", "low",
  "near", "far", "front", "back", "left", "right", "up", "down", "open", "close",
  "begin", "end", "give", "take", "call", "answer", "help", "hurt", "save", "spend"
];

export const WATSimulator = () => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [timer, setTimer] = useState(15);
  const [testOver, setTestOver] = useState(false);
  const { showTime, toggleTimeVisibility } = useTimeVisibility();

  useEffect(() => {
    if (testOver) return;

    const intervalId = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer === 0) {
          clearInterval(intervalId);
          if (currentWordIndex < words.length - 1) {
            setCurrentWordIndex((prevIndex) => prevIndex + 1);
            setTimer(15);
          } else {
            setTestOver(true);
          }
          return 15;
        } else {
          return prevTimer - 1;
        }
      });
    }, 1000);

    return () => clearInterval(intervalId);
  }, [currentWordIndex, testOver]);

  if (testOver) {
    return <div className="text-2xl items-center justify-center min-h-screen">Test Over.</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <p className="text-8xl font-bold mb-4"><strong>{words[currentWordIndex].toUpperCase()}</strong></p>
      <p
        onClick={toggleTimeVisibility}
        style={{
          cursor: "pointer",
          fontSize: "0.875rem",
          opacity: 1,
          animation: showTime ? "fade 3s ease-in-out infinite" : "none",
        }}
      >
        Time remaining: {showTime ? timer + " seconds" : "Click to show time"}
      </p>
      <style jsx>{`
        @keyframes fade {
          0%, 100% {
        opacity: 1;
          }
          50% {
        opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};
