import {NextResponse} from "next/server";
import Groq from "groq-sdk";

const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY
});
async function chatResponse(transcribeText: string) {
    const chatCompletion = await groq.chat.completions.create({
        "messages": [
            {
                "role": "user",
                "content": "Summarize the given sentances or condense them that I'll be giving you in upcoming prompts such that I can use them as notes in my note taking application (the result should be 'response' don't add any commentary from the llm)"
            },
            {
                "role": "assistant",
                "content": "Sure, feel free to provide the sentences you'd like summarized or condensed, and I'll help you create concise notes from them, also making sure that you don't get any extra commentaries, errors or even suggestions."
            },
            {
                "role": "user",
                "content": "Complete the homework of computer science, design the UI of application using tailwind and don't forget to bring groceries after uni (Don't give responses like No problem, here is a summarized version of your prompt: 'Today is Saturday.', I just want the final note content, don't show on the client side that you're an llm model)"
            },
            {
                "role": "assistant",
                "content": "'-Make sure to compelete computer assignment\n-Design UI of app using Tailwind CSS\n-Bring groceries after university'"
            },
            {
                "role": "user",
                "content": `${transcribeText} (don't give any extra response or comment just give me to the point response containing in format  "answer" nothing else in the response no model suggestions or any type of extra commentary)`
            }
        ],
        "model": "mixtral-8x7b-32768",
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

    console.log("Final response",response);
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
            return NextResponse.json({ error: 'No input provided' }, { status: 400 })
        }
    } catch (error) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
    }
}