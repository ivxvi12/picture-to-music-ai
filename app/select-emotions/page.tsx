"use client";
import { Button } from "@/components/ui/button";
import { SkipBack } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function SelectEmotions() {
  const [image1, setImage1] = useState<File | null>(null);
  const [image2, setImage2] = useState<File | null>(null);
  const [image3, setImage3] = useState<File | null>(null);

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      return e.target.files[0];
    } else {
      return null;
    }
  };

  return (
    <main className="flex min-h-screen flex-col p-7">
      <Link href="/">
        <SkipBack size={24} className="text-black" />
      </Link>
      <div className="flex flex-col items-center">
        <h1 className="text-4xl mt-32 mb-24">Upload 3 pictures...</h1>
        <div className="flex flex-row flex-wrap items-center justify-right justify-between md:space-x-4 mb-12 px-2">
          <div className="w-36 h-36 border-[0.5px] rounded-md mb-4 flex flex-row justify-center items-center shadow-md">
            <input
              type="file"
              id="image1"
              className="hidden"
              accept="image/*"
              onChange={(changeEvent) => {
                setImage1(handleImage(changeEvent));
              }}
            />
            <label htmlFor="image1" className="w-full h-full border flex flex-row items-center justify-center">
              {image1 ? (
                <img src={URL.createObjectURL(image1)} alt="image1" className="w-full h-full object-cover rounded-md" />
              ) : (
                <span>1</span>
              )}
            </label>
          </div>
          <div className="w-36 h-36 border rounded-md mb-4 flex flex-row justify-center items-center shadow-md">
            <input
              type="file"
              id="image2"
              className="hidden"
              accept="image/*"
              onChange={(changeEvent) => {
                setImage2(handleImage(changeEvent));
              }}
            />
            <label htmlFor="image2" className="w-full h-full border flex flex-row items-center justify-center">
              {image2 ? (
                <img src={URL.createObjectURL(image2)} alt="image1" className="w-full h-full object-cover rounded-md" />
              ) : (
                <span>2</span>
              )}
            </label>{" "}
          </div>
          <div className="w-36 h-36 border rounded-md mb-4 flex flex-row justify-center items-center shadow-md">
            <input
              type="file"
              id="image3"
              className="hidden"
              accept="image/*"
              onChange={(changeEvent) => {
                setImage3(handleImage(changeEvent));
              }}
            />
            <label htmlFor="image3" className="w-full h-full border flex flex-row items-center justify-center">
              {image3 ? (
                <img src={URL.createObjectURL(image3)} alt="image1" className="w-full h-full object-cover rounded-md" />
              ) : (
                <span>3</span>
              )}
            </label>
          </div>
        </div>
        <Button variant="default">
          <Link href="/">Generate emotions</Link>
        </Button>
      </div>
    </main>
  );
}
