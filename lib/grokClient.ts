import Groq from "groq-sdk";

const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY
});
export async function chatResponse(transcribeText) {
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
        "model": "mixtral-8x7b-32768",
        "temperature": 1,
        "max_tokens": 1024,
        "top_p": 1,
        "stream": true,
        "stop": null
    });

    let response;

    for await (const chunk of chatCompletion) {
        response = chunk.choices[0]?.delta?.content || ''
    }

    console.log(response);
    return response;
}
chatResponse('Compelete homework')