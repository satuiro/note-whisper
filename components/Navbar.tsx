import {cn} from "@/lib/utils";
import {Poppins} from "next/font/google";
import {UserButton} from "@clerk/nextjs";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import {SettingsIcon} from "lucide-react";

const font = Poppins({ weight: "600", subsets: ['latin'] })

const Navbar = () => {
    return (
        <div className="fixed w-full z-50 flex justify-between items-center py-2 px-4 h-16 border-b border-primary/10 bg-gray-100">
            <div className="flex items-center">
                <h1 className={cn("hidden md:block text-xl md:text-3xl font-bold text-primary", font.className)}>
                    <Link href="/">NoteWhisper</Link>
                </h1>
            </div>
            <div className="flex items-center gap-x-3">
                
                    <Link href="/settings"><SettingsIcon className="h-5 w-5" /></Link>
                
                <UserButton afterSignOutUrl="/" />
            </div>
        </div>
    );
};

export default Navbar;