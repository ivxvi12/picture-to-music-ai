"use client";
import { Button } from "@/components/ui/button";
import { Loader, Pause, Play, SkipBack } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import Player from "@madzadev/audio-player";
import "@madzadev/audio-player/dist/index.css";
import { useSearchParams } from "next/navigation";
import { get } from "http";
import { useRouter } from "next/navigation";
import API from "../service/api";

export default function UploadPictures() {
  const [songs, setSongs] = useState([] as { url: string; title: string; tags: string[] }[]);
  const searchParams = useSearchParams();
  const encodedData = searchParams.get("emotions") || "";
  const emotions = JSON.parse(encodedData) as string[];
  const descriptions = { descriptions: emotions };
  const router = useRouter();

  const fetchSongs = async () => {
    const { status, result } = await API.post("/generate-music/", descriptions, true);
    if (status) {
      const songArray = [] as { url: string; title: string; tags: string[] }[];
      result.file_paths.forEach((element: string) => {
        songArray.push({ url: `http://10.147.20.203:8000/music/${element}`, title: element, tags: [""] });
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
              <span className="text-xl">Loading...</span>
            ) : (
              <Player trackList={songs} includeTags={false} includeSearch={false} />
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
