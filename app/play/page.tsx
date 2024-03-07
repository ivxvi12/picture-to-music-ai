"use client";
import { Button } from "@/components/ui/button";
import { Pause, Play, SkipBack } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function UploadPictures() {
  const [songs, setSongs] = useState([] as string[]);
  const [playingSong, setPlayingSong] = useState(String);
  const [audio] = useState(new Audio());
  const fetchSongs = async () => {
    const response = await fetch("http://52.141.27.205:8000/music/", {
      method: "GET",
      headers: {},
    });
    const data = await response.json();
    const song_url = data.url as string;
    setSongs([...songs, song_url]);
  };
  useEffect(() => {
    fetchSongs();
  }, []);

  const handlePlaying = (song_url: string) => {
    if (playingSong === song_url) {
      setPlayingSong("");
      audio.pause();
    } else {
      setPlayingSong(song_url);
      audio.src = song_url;
      audio.play();
    }
  };

  return (
    <main className="flex min-h-screen flex-col p-7">
      <Link href="/">
        <SkipBack size={24} className="text-black" />
      </Link>
      <div className="flex flex-col items-center">
        <h1 className="text-4xl mt-32 mb-24">Play...</h1>
        <div className="flex flex-col mb-4">
          {songs.map((song) => (
            <div className="flex flex-row px-4 py-6 border rounded-md mb-6 space-x-6" key={song}>
              <div className="rounded-full bg-black w-10 h-10"></div>
              <div className="flex flex-col items-center">
                <div
                  onClick={() => {
                    handlePlaying(song);
                  }}>
                  {playingSong === song ? (
                    <Pause size={24} className="text-black mb-4" />
                  ) : (
                    <Play size={24} className="text-black mb-4" />
                  )}
                </div>
                <div className=" w-52 bg-secondary h-2 rounded-lg">
                  <div className="bg-primary h-2 w-3/4 rounded-lg"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <Button variant="default">
          <Link href="/">Share and download</Link>
        </Button>
      </div>
    </main>
  );
}
