"use client";
import { Button } from "@/components/ui/button";
import { SkipBack } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Typewriter from "typewriter-effect/dist/core";
import API from "../service/api";

export default function UploadPictures() {
  const [image1, setImage1] = useState<File | null>(null);
  const [image2, setImage2] = useState<File | null>(null);
  const [image3, setImage3] = useState<File | null>(null);

  const label1 = document.getElementById("label1");
  const label2 = document.getElementById("label2");
  const label3 = document.getElementById("label3");
  const typeWritters = [new Typewriter(label1), new Typewriter(label2), new Typewriter(label3)];

  const router = useRouter();
  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      return e.target.files[0];
    } else {
      return null;
    }
  };

  const submit = async (images: any) => {
    const data = { sentence: "" };
    for (let i = 0; i < images.length; i++) {
      const result = await API.postFormData("/upload/", images[i]);
      data.sentence += result;
      if (i === images.length - 1) {
        const emotions_promise = API.post("/keywords/", data);
        typeWritters[i]
          .typeString(result)
          .start()
          .pauseFor(1000)
          .callFunction(async () => {
            const { status, result } = await emotions_promise;
            if (status) {
              router.push(`/select-emotions?emotions=${JSON.stringify(result.results)}`);
            }
          });
      } else {
        typeWritters[i].typeString(result).start();
      }
    }
  };

  return (
    <main className="flex min-h-screen flex-col p-7">
      <Link href="/">
        <SkipBack size={24} className="text-black" />
      </Link>
      <div className="flex flex-col items-center">
        <h1 className="text-4xl mt-24 mb-8">Upload 3 pictures...</h1>
        <Button
          variant="default"
          disabled={image1 === null || image2 === null || image3 === null}
          onClick={() => {
            submit([image1, image2, image3]);
          }}>
          <span>Generate emotions</span>
        </Button>
        <div className="flex flex-row items-center justify-center md:space-x-4 mb-12 px-2w-full mt-10">
          <div className="mb-4 flex flex-col justify-center items-center mr-8">
            <div className="w-36 h-36 border-[0.5px] rounded-md mb-4 flex flex-col justify-center items-center shadow-md">
              <input
                type="file"
                id="image1"
                className="hidden"
                accept="image/*"
                onChange={(changeEvent) => {
                  setImage1(handleImage(changeEvent));
                }}
              />
              <label htmlFor="image1" className="w-full h-full flex flex-row items-center justify-center">
                {image1 ? (
                  <img
                    src={URL.createObjectURL(image1)}
                    alt="image1"
                    className="w-full h-full object-cover rounded-md"
                  />
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
              <label htmlFor="image2" className="w-full h-full flex flex-row items-center justify-center">
                {image2 ? (
                  <img
                    src={URL.createObjectURL(image2)}
                    alt="image1"
                    className="w-full h-full object-cover rounded-md"
                  />
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
              <label htmlFor="image3" className="w-full h-full flex flex-row items-center justify-center">
                {image3 ? (
                  <img
                    src={URL.createObjectURL(image3)}
                    alt="image1"
                    className="w-full h-full object-cover rounded-md"
                  />
                ) : (
                  <span>3</span>
                )}
              </label>
            </div>
          </div>
          <div className="mb-4 flex flex-col justify-center items-center">
            <div className="w-36 h-36 border rounded-md mb-4 flex flex-col justify-center items-center shadow-md">
              <span id="label1" className=" overflow-auto max-h-36 p-2"></span>
            </div>
            <div className="w-36 h-36 border rounded-md mb-4 flex flex-row justify-center items-center shadow-md">
              <span id="label2" className="overflow-auto max-h-36 p-2"></span>
            </div>
            <div className="w-36 h-36 border rounded-md mb-4 flex flex-row justify-center items-center shadow-md">
              <span id="label3" className="overflow-auto max-h-36 p-2"></span>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
