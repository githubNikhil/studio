"use client";

import { useParams, useRouter } from "next/navigation";
import { TATSimulator } from "@/components/TATSimulator";
import { WATSimulator } from "@/components/WATSimulator";
import { SRTSimulator } from "@/components/SRTSimulator";
import { SDTQuestionnaire } from "@/components/SDTQuestionnaire";
import { TimeVisibilityProvider } from "@/components/TimeVisibilityContext";
import { useEffect } from "react";

export default function TestPage() {
  const params = useParams();
  const test = params.test as string;
  const router = useRouter();

  useEffect(() => {
    if (test === "full") {
      router.push("/tests/tat");
    }
  }, [test, router]);

  if (test === "full") {
    return <p>Initializing Full Length Test...</p>;
  }

  return (
    <TimeVisibilityProvider>
      <div>
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

