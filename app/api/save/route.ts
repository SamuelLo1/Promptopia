
import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";

export const PATCH = async (request) => {
    const { id, userId } = await request.json();

    try {
        await connectToDB();

        // Find the existing prompt by ID
        const existingPrompt = await Prompt.findById(id);

        if (!existingPrompt) {
            return new Response("Prompt not found", { status: 404 });
        }

        //if item is in the saved array remove it
        
        const savedIndex = existingPrompt.saved.indexOf(userId);

        if (savedIndex !== -1) {
            // If userId is in saved, remove it
            existingPrompt.saved.splice(savedIndex, 1);
            await existingPrompt.save();

            return new Response(JSON.stringify({ message: "Unsaved", isSaved: false }), { status: 200 });
        } else {
            // If userId is not in saved, add it
            existingPrompt.saved.push(userId);
            await existingPrompt.save();

            return new Response(JSON.stringify({ message: "Saved", isSaved: true }), { status: 200 });
        }

    } catch (error) {
        return new Response("Error Updating Prompt", { status: 500 });
    }
};