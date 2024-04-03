import {NextResponse} from "next/server";
import Groq from "groq-sdk";

const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY
});
async function chatResponse(transcribeText) {
    const chatCompletion = await groq.chat.completions.create({
        "messages": [
            {
                "role": "user",
                "content": "Summarize the given sentances or condense them that I'll be giving you in upcoming prompts such that I can use them as notes in my note taking application"
            },
            {
                "role": "assistant",
                "content": "Sure, feel free to provide the sentences you'd like summarized or condensed, and I'll help you create concise notes from them."
            },
            {
                "role": "user",
                "content": "Complete the homework of computer science, design the UI of application using tailwind and don't forget to bring groceries after uni"
            },
            {
                "role": "assistant",
                "content": "- Finish computer science assignment\n- Design app's UI with Tailwind CSS\n- After class, buy groceries\n"
            },
            {
                "role": "user",
                "content": `${transcribeText}`
            }
        ],
        "model": "llama2-70b-4096",
        "temperature": 1,
        "max_tokens": 1024,
        "top_p": 1,
        "stream": true,
        "stop": null
    });

    let response = '';

    for await (const chunk of chatCompletion) {
        // console.log("Chunk:",chunk);
        if (chunk.choices[0]?.delta.content != undefined) {
            response += chunk.choices[0]?.delta.content;
        }
    }

    console.log("Final response", response);
    return response;
}
export async function POST(req: Request) {
    try {
        const body = await req.json();
        console.log("Request body",body)
        const inputString = body.string;



        if (inputString) {
            console.log("String received",inputString)
            const result = await chatResponse(inputString);
            console.log("result is",result);
            return NextResponse.json({result: result })
        } else {
            // @ts-ignore
            return NextResponse.json({ error: 'No input provided' }, { status: 400 })
        }
    } catch (error) {
        // @ts-ignore
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
    }
}