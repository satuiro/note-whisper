"use client"

import { useResultStore } from "@/store/result"

export default function ShowNotes() {

    const result = useResultStore((state: any) => state.result)

    console.log("Result is ", result);
    
    return (
        <div>
            {result.result && (
                <div>
                    {result.result}
                </div>
            )}
        </div>
    )
}
