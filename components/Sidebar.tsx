"use client"

import { cn } from "@/lib/utils";
import { Notebook} from "lucide-react"
import { usePathname, useRouter } from "next/navigation";
import { Input } from "./ui/input";

const Sidebar = () => {
    const router = useRouter();
    const pathname = usePathname();

    const onNavigate = (url: string) => {
        router.push(url);
    }

    const routes = [
        {
            icon: Notebook,
            href: '/dashboard',
            label: "Notes",
        }
    ]

    return (
        <div className="space-y-4 w-56 flex flex-col h-full text-primary bg-gray-100">
            <div className="p-3 flex-1 flex justify-center">
                <div className="space-y-2">
                    <Input type="search" placeholder="Search"/>
                    {routes.map((route) => (
                        <div
                            onClick={() => onNavigate(route.href)}
                            key={route.href}
                            className={cn( "text-muted-foreground text-xs group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-primary hover:bg-primary/10 rounded-lg transition",
                            pathname === route.href && "bg-primary/10 text-primary")}
                        >
                            <div className="flex flex-row font-semibold text-sm">
                                <route.icon className="h-4 w-4 mr-1" />
                                {route.label}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Sidebar