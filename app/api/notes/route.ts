import prismadb from "@/lib/prismadb";
import { currentUser } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(req:Request) {
    try {
        const body = await req.json();
        const user = await currentUser();

        const transcribeText: string = body.transcribeText

        if (!user || !user.id || !user.firstName) {
            return new NextResponse("Unotharized access", { status: 401 });
        }

        if (transcribeText) {
    
            const newNote = await prismadb.note.create({
                data: {
                    content:  body.transcribeText,
                    userId: user.id,
                }
            })

            return NextResponse.json(newNote);
        }
        
        return new NextResponse("Note not in correct format", {status: 404})
        
        } catch (error) {
            console.log("[NOTE CREATION ERROR]", error);
            return new NextResponse("Internal Error", { status: 500 });
        }

}

export async function GET() {
    try {
        const user = await currentUser();

        if (user) {
            const notes = await prismadb.note.findMany({
                where: {
                    userId: user.id,
                }
            })
            // console.log(notes);
            
            return NextResponse.json(notes);
        }

        return new NextResponse("Not authorized", {status: 401})
    } catch (error) {
        console.log("[NOTE RETRIEVAL ERROR]", { status: 500 })
    }
}