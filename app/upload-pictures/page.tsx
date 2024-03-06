"use client";
import { Button } from "@/components/ui/button";
import { SkipBack } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function UploadPictures() {
  const [image1, setImage1] = useState<File | null>(null);
  const [image2, setImage2] = useState<File | null>(null);
  const [image3, setImage3] = useState<File | null>(null);
  const router = useRouter();
  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      return e.target.files[0];
    } else {
      return null;
    }
  };

  const uploadFiles = async (images: any) => {
    const files = new FormData();
    if (images) {
      for (const image in images) {
        if (images[image] !== null) {
          files.append("files", images[image]);
        }
      }
    }
    try {
      console.log("Uploading...");
      const response = await fetch("http://52.141.27.205:8000/upload/", {
        method: "POST",
        headers: {},
        body: files,
      });
      if (response.ok) {
        const data = await response.json();
        //router.push({ pathname: "/emotions", query: { emotions: data } });
      }
    } catch (error) {
      console.error("Error:", error);
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
            </label>
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
        <Button
          variant="default"
          disabled={image1 === null && image2 === null && image3 === null}
          onClick={() => {
            uploadFiles([image1, image2, image3]);
          }}>
          <span>Generate emotions</span>
        </Button>
      </div>
    </main>
  );
}
