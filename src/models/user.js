import mongoose from "mongoose"; // Importing the Mongoose module

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true // Ensures username uniqueness
    },
    email: {
        type: String,
        required: true,
        unique: true // Ensures email uniqueness
    },
    password: {
        type: String,
        required: true
    },
    profileImage: {
        type: String // Path of the profile image
    },
    interests: [{
        type: String // Stores user's interests as a list
    }],
    registrationDate: {
        type: Date,
        default: Date.now // Automatically sets the registration date
    },
    lastLoginDate: {
        type: Date // Last login date
    },
    elo: {
        type: Number, // Average rating given by the user
        required: true
    },
    gender: {
        type: String,
        enum: ['male', 'female', 'other'], // Limits gender to specified values
        required: true // Ensures gender is provided
    }
});

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
