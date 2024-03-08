"use client";
import { Button } from "@/components/ui/button";
import { SkipBack } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useSearchParams } from "next/navigation";

export default function SelectEmotions() {
  const searchParams = useSearchParams();
  const encodedData = searchParams.get("emotions") || "";
  const emotions = (JSON.parse(encodedData).results as string[]) || [];
  const [selectedEmotions, setSelectedEmotions] = useState<string[]>([]);

  return (
    <main className="flex min-h-screen flex-col p-7">
      <Link href="/upload-pictures">
        <SkipBack size={24} className="text-black" />
      </Link>
      <div className="flex flex-col items-center">
        <h1 className="text-4xl mt-32 mb-24">Select emotions...</h1>
        <div className="flex flex-row flex-wrap items-center justify-center gap-6 mb-12 px-2">
          {emotions.map((emotion) => (
            <Button
              key={emotion}
              variant={selectedEmotions.includes(emotion) ? "default" : "secondary"}
              onClick={() => {
                if (selectedEmotions.includes(emotion)) {
                  setSelectedEmotions(selectedEmotions.filter((e) => e !== emotion));
                } else {
                  setSelectedEmotions([...selectedEmotions, emotion]);
                }
              }}
              className="w-24">
              {emotion}
            </Button>
          ))}
        </div>
        <Button variant="default">
          <Link href="/play">Generate music</Link>
        </Button>
      </div>
    </main>
  );
}
