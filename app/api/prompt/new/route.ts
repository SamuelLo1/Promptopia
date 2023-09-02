import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";

export const POST = async (request) => {
    const { userId, prompt, tag } = await request.json();
    //store time this post was made
    const time = new Date().toLocaleString('en-US', { timeZone: 'America/Los_Angeles',
        hour: 'numeric',
        minute: 'numeric'
    });
    //store date this post was made for later logic to add time when viewing posts
    const date = new Date().toLocaleString('en-US', { timeZone: 'America/Los_Angeles',
        month: 'numeric',
        day:'numeric',
        year: 'numeric'
    });
    try {
        await connectToDB();
        const newPrompt = new Prompt({ creator: userId, prompt, tag, time, date });

        await newPrompt.save();
        return new Response(JSON.stringify(newPrompt), { status: 201 })
    } catch (error) {
        return new Response("Failed to create a new prompt", { status: 500 });
    }
}