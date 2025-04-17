
"use client";

import { useParams } from "next/navigation";
import { TATSimulator } from "@/components/TATSimulator";
import { WATSimulator } from "@/components/WATSimulator";
import { SRTSimulator } from "@/components/SRTSimulator";
import { SDTQuestionnaire } from "@/components/SDTQuestionnaire";

export default function TestPage() {
  const params = useParams();
  const test = params.test as string;

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      {test === "tat" && <TATSimulator />}
      {test === "wat" && <WATSimulator />}
      {test === "srt" && <SRTSimulator />}
      {test === "sdt" && <SDTQuestionnaire />}
      {test === "full" && (
        <>
          <TATSimulator />
          <WATSimulator />
          <SRTSimulator />
          <SDTQuestionnaire />
        </>
      )}
      {!["tat", "wat", "srt", "sdt", "full"].includes(test) && (
        <p>Invalid test selected.</p>
      )}
    </div>
  );
}
