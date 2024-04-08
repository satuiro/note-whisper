"use client"

import { useResultStore } from "@/store/result"
import { Card, CardTitle } from "@/components/ui/card";
import { useEffect, useState } from "react"
import { useUser } from "@clerk/nextjs"
import { Note } from "@prisma/client"
import { Button } from "./ui/button"
import { Delete, DeleteIcon } from "lucide-react"
  

export default function ShowNotes() {
    
    const result: any = useResultStore((state: any) => state.result)
    // const setResult = useResultStore((state: any) => state.updateResult);
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
          // console.log("response is", res)
        })
        .catch((error: any) => {
          // console.log("Error in note ", error.message);
          
        })
    }, [result])

    // console.log("result is", result);

    const handleDelete = async (id: number) => {
      const noteDeleted = await fetch(`/api/notes/${id}`,{
        method: 'DELETE',
        mode: "cors",
        headers: {
          "Content-Type": "application/json"
        },
      })

      const res = await noteDeleted.json();

      if (res) {
        console.log("Note deleted", res)
      }
    }

    return (
      <div className="flex flex-wrap mt-4">
        {notes?.map((note, index) => (
          <div key={note.id}>
            <Card className="w-[200px] mr-4 mb-4 shadow-md">
              <CardTitle className="text-xl">
                <span className="font-semibold">
                  {note.content}
                  <Button
                    variant="destructive"
                    className="h-6 w-4 ml-2"
                    onClick={() => handleDelete(note.id)}
                  >
                    <Delete />
                  </Button>
                </span>
              </CardTitle>
            </Card>
            {(index + 1) % 4 === 0 && (
              <div className="w-full" key={`row-${index}`} />
            )}
          </div>
        ))}
      </div>
    );
}
