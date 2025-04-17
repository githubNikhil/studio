"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useTimeVisibility } from "@/components/TimeVisibilityContext";

export const SDTQuestionnaire = () => {
  const [isStudent, setIsStudent] = useState<boolean | null>(null);
  const [timer, setTimer] = useState(900); // 15 minutes in seconds
  const [testOver, setTestOver] = useState(false);
  const { showTime, toggleTimeVisibility } = useTimeVisibility();

  const studentQuestions = [
    "What your parents think of you?",
    "What your teachers think about you?",
    "What do your friends think about you?",
    "What do you think about yourself?",
    "What would you like to be?",
  ];

  const professionalQuestions = [
    "What your parents think of you?",
    "What your Manager/Employer think about you?",
    "What do your Colleagues think about you?",
    "What do you think about yourself?",
    "What would you like to be?",
  ];

  useEffect(() => {
    if (isStudent === null || testOver) return;

    const intervalId = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer === 0) {
          clearInterval(intervalId);
          setTestOver(true);
          return 0;
        } else {
          return prevTimer - 1;
        }
      });
    }, 1000);

    return () => clearInterval(intervalId);
  }, [isStudent, testOver]);

  const handleOptionClick = (option: boolean) => {
    setIsStudent(option);
  };

  if (isStudent === null) {
    return (
      <div className="flex flex-col items-center">
        <h2 className="text-2xl font-semibold mb-4">SDT Questionnaire</h2>
        <p className="mb-4">What describes you best?</p>
        <div className="flex gap-4">
          <Button onClick={() => handleOptionClick(true)}>Student</Button>
          <Button onClick={() => handleOptionClick(false)}>Working Professional</Button>
        </div>
      </div>
    );
  }

  if (testOver) {
    return <div className="text-2xl">Test Over.</div>;
  }

  const questions = isStudent ? studentQuestions : professionalQuestions;

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-2xl font-semibold mb-4">SDT Questionnaire</h2>
      <p className="mb-4">Please answer the following questions:</p>
      {questions.map((question, index) => (
        <p key={index} className="mb-2">
          {index + 1}. {question}
        </p>
      ))}
      <p onClick={toggleTimeVisibility} style={{ cursor: "pointer" }}>
        Time remaining:{" "}
        {showTime ? (
          <>
            {Math.floor(timer / 60)}:
            {(timer % 60).toLocaleString("en-US", {
              minimumIntegerDigits: 2,
              useGrouping: false,
            })}
          </>
        ) : (
          "Click to show time"
        )}
      </p>
    </div>
  );
};
