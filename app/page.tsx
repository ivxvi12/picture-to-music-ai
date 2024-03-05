import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center">
      <h1 className={`text-5xl mt-32 mb-24`}>Audartory</h1>
      <div className="flex flex-col items-center justify-center">
        <Button variant="default">
          <Link href="/upload-pictures">START</Link>
        </Button>
      </div>
    </main>
  );
}
