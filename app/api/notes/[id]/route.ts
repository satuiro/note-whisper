import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function DELETE(req: Request,
    { params }: { params: { id: number }}
) {
    try {
        const { userId } = auth();
        if (!userId) {
            return new NextResponse("Unotharized", { status: 401 }); 
        }

        // console.log('params id is', params.id);
        

        const note = await prismadb.note.delete({
            where: {
                id: Number(params.id),
                userId: userId,
            }
        })

        return NextResponse.json(note);
    } catch (error) {
        console.log("[NOTE_DELETE]", error);
        return new NextResponse("Error in note deletion", { status: 500 });
    }
}