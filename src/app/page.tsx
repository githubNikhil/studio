
"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const handlePracticePsychClick = () => {
    router.push("/practice");
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-semibold mb-4">Welcome to SSB Psych Prep</h1>
      <Button onClick={handlePracticePsychClick}>Practice Psych</Button>
    </div>
  );
}
