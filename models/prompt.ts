import mongoose, { Schema, model, models } from 'mongoose';


const PromptSchema = new Schema({
    //this type is mongoDB object ids
    //ref User shows this model should reference User model
    //unique id created for each user inserted in DB
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    }, 
    prompt: {
        type:String,
        required: [true,'Prompt is required'],
    },
    tag: {
        type: String,
        required: [true,'Tag is required'],
    },
    time: {
        type: String, 
    }, 
    date: {
        type: String,
    },
    response: {
        type: String,
    },
    saved: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    

});

const Prompt = models.Prompt || model('Prompt', PromptSchema);

export default Prompt;