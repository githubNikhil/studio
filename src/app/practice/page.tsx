
"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function PracticePage() {
  const router = useRouter();

  const handleTestClick = (test: string) => {
    router.push(`/tests/${test}`);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h2 className="text-2xl font-semibold mb-4">Choose a Practice Test:</h2>
      <div className="flex flex-col gap-4">
        <Button onClick={() => handleTestClick("tat")}>TAT Simulator</Button>
        <Button onClick={() => handleTestClick("wat")}>WAT Simulator</Button>
        <Button onClick={() => handleTestClick("srt")}>SRT Simulator</Button>
        <Button onClick={() => handleTestClick("sdt")}>SDT Questionnaire</Button>
        <Button onClick={() => handleTestClick("full")}>Full Length Psych</Button>
      </div>
    </div>
  );
}
