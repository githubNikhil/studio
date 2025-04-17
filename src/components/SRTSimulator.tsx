"use client";

import React, { useState, useEffect } from "react";
import { useTimeVisibility } from "@/components/TimeVisibilityContext";

const scenarios = [
  "You are walking down the street and see someone drop their wallet...",
  "You are in a meeting and your colleague presents an idea you disagree with...",
  "You find a lost dog in your neighborhood...",
  "You notice a fire in a nearby building...",
  "You are running late for an important appointment...",
  "You receive a phone call with bad news...",
  "You are at a restaurant and your order is incorrect...",
  "You are driving and your car breaks down...",
  "You witness someone being harassed on the street...",
  "You accidentally spill coffee on someone...",
  "You are at a party and don't know anyone...",
  "You are asked to speak in public but are unprepared...",
  "You lose your keys...",
  "You receive an unexpected gift...",
  "You have a disagreement with a family member...",
  "You are offered a new job with higher pay but less security...",
  "You are stuck in an elevator...",
  "You see someone shoplifting...",
  "You miss your train...",
  "You are blamed for something you didn't do...",
  "You find a large sum of money...",
  "You are in a crowded place and feel claustrophobic...",
  "You have to make a difficult decision...",
  "You are approached by a stranger...",
  "You have a flat tire...",
  "You are given a compliment...",
  "You have to work with someone you don't like...",
  "You are in a power outage...",
  "You witness a minor accident...",
  "You are asked to keep a secret...",
  "You are feeling overwhelmed with tasks...",
  "You receive an anonymous letter...",
  "You are asked to lie for a friend...",
  "You are caught in a heavy rainstorm...",
  "You have to choose between two equally important events...",
  "You are locked out of your house...",
  "You receive a promotion at work...",
  "You are asked to donate to a charity...",
  "You are feeling sick on an important day...",
  "You are asked to mediate a conflict...",
  "You are feeling lonely...",
  "You are offered a bribe...",
  "You are asked to take the blame for someone else...",
  "You are caught in a traffic jam...",
  "You receive a piece of criticism...",
  "You are asked to speak at a funeral...",
  "You are feeling uninspired...",
  "You are offered a partnership...",
  "You are asked to testify in court...",
  "You are feeling nostalgic...",
  "You are asked to keep watch over someone's child but have an urgent meeting...",
  "Your neighbor keeps parking in your spot...",
  "Your family wants to move to your hometown, but your spouse disagrees...",
  "You find out your spouse has a gambling addiction...",
  "Your sibling steals money from your parents...",
  "You suspect your friend's partner is cheating...",
  "Your parents are not approving of your life partner..."
];

export const SRTSimulator = () => {
  const [currentScenarioIndex, setCurrentScenarioIndex] = useState(0);
  const [timer, setTimer] = useState(30);
  const [testOver, setTestOver] = useState(false);
  const { showTime, toggleTimeVisibility } = useTimeVisibility();

  useEffect(() => {
    if (testOver) return;

    const intervalId = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer === 0) {
          clearInterval(intervalId);
          if (currentScenarioIndex < scenarios.length - 1) {
            setCurrentScenarioIndex((prevIndex) => prevIndex + 1);
            setTimer(30);
          } else {
            setTestOver(true);
          }
          return 30;
        } else {
          return prevTimer - 1;
        }
      });
    }, 1000);

    return () => clearInterval(intervalId);
  }, [currentScenarioIndex, testOver]);

  if (testOver) {
    return <div className="text-2xl">Test Over.</div>;
  }

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-2xl font-semibold mb-4">SRT Simulator</h2>
      <p className="text-lg mb-4">{scenarios[currentScenarioIndex]}</p>
      <p onClick={toggleTimeVisibility} style={{ cursor: "pointer" }}>
        Time remaining: {showTime ? timer + " seconds" : "Click to show time"}
      </p>
    </div>
  );
};

