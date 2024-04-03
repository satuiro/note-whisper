import Image from "next/image";
// import Microphone from "./microphone";
import {SignInButton, SignUpButton} from "@clerk/nextjs";
import {Button} from "@/components/ui/button";
import Link from "next/link";
export default async function Home() {
  return (
   <main>
       Home Page
       <Button>
           <Link href="/sign-up">
               Sign-up
           </Link>
       </Button>
       <Button>
           <Link href="/sign-in">
               Sign-in
           </Link>
       </Button>
   </main>
  );
}
