
"use client";

import React, { useState, useEffect } from "react";

const images = [
  "https://picsum.photos/600/400?random=1",
  "https://picsum.photos/600/400?random=2",
  "https://picsum.photos/600/400?random=3",
  "https://picsum.photos/600/400?random=4",
  "https://picsum.photos/600/400?random=5",
  "https://picsum.photos/600/400?random=6",
  "https://picsum.photos/600/400?random=7",
  "https://picsum.photos/600/400?random=8",
  "https://picsum.photos/600/400?random=9",
  "https://picsum.photos/600/400?random=10",
  "https://picsum.photos/600/400?random=11",
];

export const TATSimulator = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [timer, setTimer] = useState(30);
  const [isGap, setIsGap] = useState(false);
  const [gapTimer, setGapTimer] = useState(240); // 4 minutes in seconds
  const [testOver, setTestOver] = useState(false);

  useEffect(() => {
    if (testOver) return;

    let intervalId: NodeJS.Timeout | null = null;

    if (!isGap) {
      intervalId = setInterval(() => {
        setTimer((prevTimer) => {
          if (prevTimer === 0) {
            clearInterval(intervalId!);
            setIsGap(true);
            return 30; // Reset timer for next image, though it won't be used
          } else {
            return prevTimer - 1;
          }
        });
      }, 1000);
    } else {
      intervalId = setInterval(() => {
        setGapTimer((prevGapTimer) => {
          if (prevGapTimer === 0) {
            clearInterval(intervalId!);
            setIsGap(false);
            setCurrentImageIndex((prevIndex) => prevIndex + 1);
            setGapTimer(240); // Reset gap timer
            return 240;
          } else {
            return prevGapTimer - 1;
          }
        });
      }, 1000);
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [currentImageIndex, isGap, testOver]);

  useEffect(() => {
    if (currentImageIndex === images.length) {
      setTestOver(true);
    }
  }, [currentImageIndex]);

  if (testOver) {
    return <div className="text-2xl">Test Over.</div>;
  }

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-2xl font-semibold mb-4">TAT Simulator</h2>
      {!isGap ? (
        <>
          {currentImageIndex < images.length ? (
            <img
              src={images[currentImageIndex]}
              alt={`TAT Image ${currentImageIndex + 1}`}
              className="mb-4 rounded-md shadow-lg"
            />
          ) : (
            <div className="w-600 h-400 bg-gray-200 mb-4 rounded-md shadow-lg">
              {/* Blank slide */}
            </div>
          )}
          <p>Time remaining: {timer} seconds</p>
        </>
      ) : (
        <p>
          Gap time remaining: {Math.floor(gapTimer / 60)}:
          {(gapTimer % 60).toLocaleString('en-US', {
            minimumIntegerDigits: 2,
            useGrouping: false,
          })}
        </p>
      )}
    </div>
  );
};
