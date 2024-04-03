import Microphone from "@/components/microphone";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { MicIcon } from "lucide-react";

export default function Dashboard() {
    return (
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
    )
}