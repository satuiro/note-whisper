import { MicIcon } from "lucide-react";
import { auth, redirectToSignIn, currentUser } from "@clerk/nextjs";
import prismadb from "@/lib/prismadb";
import Microphone from "@/components/microphone";
import { Button } from "@/components/ui/button";
import {
Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import ShowNotes from "@/components/ShowNotes";

export default async function Dashboard() {
  const {userId} = auth();
  if (!userId) {
    redirectToSignIn();
  }

  const user = await currentUser();

  if (userId !== null && user !== null) {
    const findUser = false
    // console.log("User found", findUser);
    if (!findUser) {
      const createUser = await prismadb.user.create({
        data: {
          id: userId,
          username: user.firstName || "default",
          email: user.emailAddresses[0].emailAddress || "",
        }
      })
      // console.log("User created", createUser);
    }
  }

  return (
    <div>
      <div className="flex justify-between">
      Dashboard Page
      <Popover>
        <PopoverTrigger>
          <Button className="text-white rounded-md mr-4">
            <MicIcon className="h-5 w-5 mr-1" />
            New Note
          </Button>
        </PopoverTrigger>
        <PopoverContent>
          <Microphone />
        </PopoverContent>
      </Popover>
    </div>
    <ShowNotes />
    </div>
  );
}