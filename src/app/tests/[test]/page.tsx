"use client";

import { useParams, useRouter } from "next/navigation";
import { TATSimulator } from "@/components/TATSimulator";
import { WATSimulator } from "@/components/WATSimulator";
import { SRTSimulator } from "@/components/SRTSimulator";
import { SDTQuestionnaire } from "@/components/SDTQuestionnaire";
import { TimeVisibilityProvider } from "@/components/TimeVisibilityContext";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

const TestSequence = ["tat", "wat", "srt", "sdt"];

export default function TestPage() {
  const params = useParams();
  const test = params.test as string;
  const router = useRouter();

  const [currentTestIndex, setCurrentTestIndex] = useState(
    TestSequence.indexOf(test)
  );
  const [showNextTestOptions, setShowNextTestOptions] = useState(false);
  const [nextTest, setNextTest] = useState<string | null>(null);
  const [timer, setTimer] = useState(60); // 1 minute timer

  useEffect(() => {
    if (test === "full") {
      // Redirect to the first test in the sequence if it's a full test
      router.replace(`/tests/${TestSequence[0]}`);
    }
  }, [test, router]);

  useEffect(() => {
    if (showNextTestOptions && timer > 0) {
      const intervalId = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);

      return () => clearInterval(intervalId);
    } else if (showNextTestOptions && timer === 0) {
      // Auto-continue to the next test if the timer runs out
      handleContinue();
    }
  }, [showNextTestOptions, timer]);

  // Determine the next test in the sequence
  useEffect(() => {
    if (test !== "full") {
      const nextIndex = currentTestIndex + 1;
      if (nextIndex < TestSequence.length) {
        setNextTest(TestSequence[nextIndex]);
        setShowNextTestOptions(true);
        setTimer(60); // Reset timer for the next test options
      } else {
        setNextTest(null);
        setShowNextTestOptions(false);
      }
    }
  }, [currentTestIndex, test]);

  const handleSkip = () => {
    // Skip to the next test after the next one
    const nextIndex = currentTestIndex + 2;
    if (nextIndex < TestSequence.length) {
      router.push(`/tests/${TestSequence[nextIndex]}`);
    } else {
      // If there are no more tests, redirect to a "test over" page or home page
      router.push("/");
    }
  };

  const handleContinue = () => {
    if (nextTest) {
      router.push(`/tests/${nextTest}`);
    } else {
      // If there are no more tests, redirect to a "test over" page or home page
      router.push("/");
    }
  };

  if (test === "full") {
    return <p>Initializing Full Length Test...</p>;
  }

  if (showNextTestOptions) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <h2>Up Next: {nextTest?.toUpperCase()}</h2>
        <p>Time Remaining: {timer} seconds</p>
        <div className="flex gap-4">
          <Button onClick={handleSkip}>Skip</Button>
          <Button onClick={handleContinue}>Continue</Button>
        </div>
      </div>
    );
  }

  return (
    <TimeVisibilityProvider>
      <div className="flex flex-col items-center justify-center h-screen">
        {test === "tat" && <TATSimulator />}
        {test === "wat" && <WATSimulator />}
        {test === "srt" && <SRTSimulator />}
        {test === "sdt" && <SDTQuestionnaire />}
        {!["tat", "wat", "srt", "sdt", "full"].includes(test) && (
          <p>Invalid test selected.</p>
        )}
      </div>
    </TimeVisibilityProvider>
  );
}
