"use client"

import { useResultStore } from "@/store/result"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import { useEffect, useState } from "react"
import prismadb from "@/lib/prismadb"
import { currentUser, useUser } from "@clerk/nextjs"
import { Note } from "@prisma/client"
  

export default function ShowNotes() {
    
    const result: any = useResultStore((state: any) => state.result)
    const user = useUser();
    const [notes, setNotes] = useState<Note[]>();

    useEffect(() => {
      async function getNotes() {
          const res = await fetch('/api/notes',{
            method: 'GET',
            mode: "cors",
            headers: {
              "Content-Type": "application/json"
            },
          })
          const notesData: Note[] = await res.json();
          setNotes(notesData)
        }
      getNotes();
    }, [notes])

    useEffect(() => {
      async function sendNote(data: {}) {
        const res = await fetch('/api/notes',{
          method: 'POST',
          mode: "cors",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(data),
        })

        const response = await res.json();
        return response; 
      }
      sendNote({transcribeText: result.result})
        .then((res) => {
          console.log("response is", res)
        })
        .catch((error: any) => {
          console.log("Error in note ", error.message);
          
        })
    }, [result])

    console.log("result is", result);

    return (
      <div className="flex flex-row space-x-3">
        {
              notes?.map((note) => (
                <div key={note.id}>
                  <Card className="w-[200px] mr-4 shadow-md">
                    <CardTitle className="text-xl">
                      <span>{note.content}</span>
                    </CardTitle>
                  </Card>
                </div>
              ))
            }
      </div>
    );
}
