"use client";
import { Button } from "@/components/ui/button";
import { Loader, Pause, Play, SkipBack } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import Player from "@madzadev/audio-player";
import "@madzadev/audio-player/dist/index.css";

export default function UploadPictures() {
  const [songs, setSongs] = useState([] as { url: string; title: string; tags: string[] }[]);

  const fetchSongs = async () => {
    try {
      const response = await fetch("http://52.141.27.205:8000/music/", {
        method: "GET",
        headers: {},
      });
      if (response.ok) {
        const data = await response.json();
        setSongs([...songs, data]);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  useEffect(() => {
    fetchSongs();
  }, []);

  return (
    <main className="flex min-h-screen flex-col p-7">
      <Link href="/">
        <SkipBack size={24} className="text-black" />
      </Link>
      <div className="flex flex-col items-center">
        <h1 className="text-4xl mt-32 mb-24">Play...</h1>
        <div className="flex flex-col mb-4 w-full items-center">
          <div className="flex flex-row py-6 rounded-md mb-6 w-full justify-center">
            {songs.length <= 0 ? (
              <span className="text-xl">Loading...</span>
            ) : (
              <Player trackList={songs} includeTags={false} includeSearch={false} showPlaylist={false} />
            )}
          </div>
        </div>
        <Button variant="default" disabled={songs.length === 0}>
          <Link href="/">Share and download</Link>
        </Button>
      </div>
    </main>
  );
}
