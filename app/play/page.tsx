"use client";
import { Button } from "@/components/ui/button";
import { Pause, Play, SkipBack } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function UploadPictures() {
  const songs = [{ name: "Song 1" }, { name: "Song 2" }, { name: "Song 3" }];
  const [playingSong, setPlayingSong] = useState(String);

  return (
    <main className="flex min-h-screen flex-col p-7">
      <Link href="/">
        <SkipBack size={24} className="text-black" />
      </Link>
      <div className="flex flex-col items-center">
        <h1 className="text-4xl mt-32 mb-24">Play...</h1>
        <div className="flex flex-col">
          {songs.map((song) => (
            <div className="flex flex-row px-4 py-6 border rounded-md mb-4 space-x-6">
              <div className="rounded-full bg-black w-10 h-10"></div>
              <div className="flex flex-col items-center">
                <div
                  onClick={() => {
                    if (playingSong === song.name) {
                      setPlayingSong("");
                    } else {
                      setPlayingSong(song.name);
                    }
                  }}>
                  {playingSong === song.name ? (
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
