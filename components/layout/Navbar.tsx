"use client"

import useScroll from "@/lib/hooks/use-scroll"
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";
import { SignInButton, SignOutButton, SignUpButton, useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

export default function Navbar() {
    const scrolled = useScroll(50);
    const router = useRouter();
    const user = useUser();

    return (
      <>
        <div
          className={`fixed top-0 w-full flex justify-center ${
            scrolled
              ? "border-b border-gray-200 bg-white/50 backdrop-blur-xl"
              : "bg-white/0"
          }`}
        >
          <div className="mx-5 flex h-16 max-w-screen-xl items-center justify-between w-full">
            <Link
              href="/"
              className="flex items-center font-display text-3xl font-semibold"
            >
              <Image
                src="/logo.png"
                alt="Logo"
                width={40}
                height={40}
                className="mr-2 rounded-sm"
              ></Image>
              <p>
                NoteWhisper
              </p>
            </Link>
            <div>
              <Button
                className="p-1.5 text-xl pl-2 px-4 mr-4 font-semibold transition-all border border-black hover:bg-white hover:text-black"
                onClick={() => {
                    if (user.isSignedIn) {
                        router.push('/dashboard')
                    }
                    router.push('/sign-in')
                }}
              >
                Sign-in
              </Button>

              <Button
                className="p-1.5 text-xl pl-2 px-4 font-semibold transition-all border border-black hover:bg-white hover:text-black"
                onClick={() => {
                    if (user.isSignedIn) {
                        router.push('/dashboard')
                    }
                    router.push('/sign-up')
                }}
              >
                Sign-up
              </Button>
            </div>
          </div>
        </div>
      </>
    );
}