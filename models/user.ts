import { Schema, model, models } from 'mongoose';

//creating a new schema 
//UserSchema has a field of email, username, and image
const UserSchema = new Schema({
    //must be unique or else validation message is sent
    email: {
        type: String,
        unique: [true, 'Email already exists'],
        required: [true, 'Email is required'],
    },
    //uses a regular expression to get a valid userName
    username: {
        type: String,
        unique: [true, 'Username already exists'],
        match: [/^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/, "Username invalid, it should contain 8-20 alphanumeric letters and be unique!"],
    },
    image: {
        type: String,
    }
});

//checks if a schema of User already exists and if not it creates a model named "User"
const User = models.User || model("User", UserSchema);

//exports this user model
export default User;