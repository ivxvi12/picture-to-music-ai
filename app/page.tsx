import { Button } from "@/components/ui/button"
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <h1 className={`text-6xl mt-36 mb-28`}>
        Audartory
      </h1>
      <div className="flex flex-col items-center justify-center">
        <Button variant="default">
          <Link href="/">START</Link>
        </Button>
      </div> 
    </main>
  );
}
