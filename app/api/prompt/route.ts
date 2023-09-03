import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";

export const GET = async (request) => {
    try {
        await connectToDB()
         //what I beleive populate does is it also allows userData to be accessed from the prompt 
        const prompts = await Prompt.find({}).populate('creator')

        return new Response(JSON.stringify(prompts), { status: 200 })
    } catch (error) {
        return new Response("Failed to fetch all prompts", { status: 500 })
    }
} 