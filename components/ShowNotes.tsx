"use client";

import { useResultStore } from "@/store/result";
import { Card, CardTitle } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { Note } from "@prisma/client";
import { Button } from "./ui/button";
import { Delete } from "lucide-react";

export default function ShowNotes() {
  const result: any = useResultStore((state: any) => state.result);
  const user = useUser();
  const [notes, setNotes] = useState<Note[]>([]);

  const fetchNotes = async () => {
    const res = await fetch("/api/notes", {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const notesData: Note[] = await res.json();
    setNotes(notesData);
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  useEffect(() => {
    async function sendNote(data: {}) {
      const res = await fetch("/api/notes", {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const response = await res.json();
      return response;
    }

    if (result.result) {
      sendNote({ transcribeText: result.result })
        .then((res) => {
          fetchNotes();
        })
        .catch((error: any) => {
          console.error("Error in note ", error.message);
        });
    }
  }, [result]);

  const handleDelete = async (id: number) => {
    const noteDeleted = await fetch(`/api/notes/${id}`, {
      method: "DELETE",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const res = await noteDeleted.json();

    if (res) {
      console.log("Note deleted", res);
      fetchNotes();
    }
  };

  return (
    <div className="flex flex-wrap mt-4">
      {notes.map((note, index) => (
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
