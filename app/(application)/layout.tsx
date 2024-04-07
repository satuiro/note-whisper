import { cn } from "@/lib/utils";
import { sfPro } from "../fonts";
import Navbar from "@/components/layout/Navbar";

export default function ApplicationLayout({ children }:
    {children: React.ReactNode}) {
        return(
            <main className={cn(sfPro.className, "fixed h-screen w-full bg-gradient-to-br from-slate-200 via-white to-purple-200 flex min-h-screen flex-col items-center py-32")}>
                <Navbar />
                {children}
            </main>
        )
}