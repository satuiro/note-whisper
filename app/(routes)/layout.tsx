import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";

export default function RoutesLayout({ children }:
    { children: React.ReactNode }) {
    return (
        <div className="h-full" suppressHydrationWarning>
            <Navbar />
            <div className="hidden md:flex mt-16 h-full w-20 flex-col fixed inset-y-0">
                <Sidebar />
            </div>
            <main className="md:pl-60 pt-20 h-full">
                {children}
            </main>
        </div>
    )
}