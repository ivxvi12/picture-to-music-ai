"use client";
import { Button } from "@/components/ui/button";
import { SkipBack } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import Player from "@madzadev/audio-player";
import "@madzadev/audio-player/dist/index.css";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import API from "../service/api";

export default function UploadPictures() {
  const [songs, setSongs] = useState([] as { url: string; title: string; tags: string[] }[]);
  const searchParams = useSearchParams();
  const encodedData = searchParams.get("emotions") || "";
  const emotions = JSON.parse(encodedData) as string[];
  const genre = ["genre: jazz", "genre: rock", "genre: ballad", "genre: edm", "genre: country", "genre: blues"]
  const descriptions = { descriptions: [ 
    genre[0] + " with guitar, bass, piano and drum  has emotions like " +emotions.join(" "), 
    genre[1] + " with electric guitar, bass, piano and drum has emotions like " +emotions.join(" "),
    genre[2] + " with only string and piano has emotions like " +emotions.join(" "),
    genre[3] + " with electronic piano has emotions like " +emotions.join(" "),
    genre[4] + " with acoustic guitar has emotions like " +emotions.join(" "),
    genre[5] + " with guitar, bass, piano and drum has emotions like " +emotions.join(" ")
  ]};
  const router = useRouter();

  const fetchSongs = async () => {
    const { status, result } = await API.post("/generate-music/", descriptions);
    let i = 0;
    if (status) {
      const songArray = [] as { url: string; title: string; tags: string[] }[];
      result.filepaths.forEach((element: string) => {
        songArray.push({ url: `${process.env.NEXT_PUBLIC_API_URL}${element}`, title: genre[i], tags: [""] });
        i = i + 1;
      });
      setSongs(songArray);
    }
  };

  useEffect(() => {
    fetchSongs();
  }, []);

  return (
    <main className="flex min-h-screen flex-col p-7">
      <SkipBack
        size={24}
        className="text-black"
        onClick={() => {
          router.back();
        }}
      />
      <div className="flex flex-col items-center">
        <h1 className="text-4xl mt-32 mb-8">Play...</h1>
        <Button variant="default" disabled={songs.length === 0}>
          <Link href="/">Share and download</Link>
        </Button>
        <div className="flex flex-col mb-4 w-full items-center mt-10">
          <div className="flex flex-row py-6 rounded-md mb-6 w-full justify-center">
            {songs.length <= 0 ? (
              <span className="text-xl">Generating...</span>
            ) : (
              <Player trackList={songs} includeTags={false} includeSearch={false} />
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
