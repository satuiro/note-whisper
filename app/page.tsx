"use client";

import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Home() {
  const user = useUser();
  const router = useRouter();
  console.log(user);

  return (
    <main>
      <div className="flex flex-row justify-between mb:text-4xl">
        <span className="ml-5">Home Page</span>
        <div className="mt-1">
          <Button className="mr-2">
            <Link href="/sign-up">Sign-up</Link>
          </Button>
          {user.isSignedIn ? (
            <Button className="mr-2" onClick={() => router.push("/dashboard")}>Sign-in</Button>
          ) : (
            <Button className="mr-2">
              <Link href="/sign-in">Sign-in</Link>
            </Button>
          )}
        </div>
      </div>
    </main>
  );
}
