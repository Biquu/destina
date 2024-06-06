import mongoose from "mongoose";

const gameSchema = new mongoose.Schema({
    // Title of the game
    title: {
        type: String,
        required: true
    },
    // Unique code for the game
    code: {
        type: String,
        required: true,
        unique: true
    },
    // Type of the game, e.g. "15min", "30min", "45min"
    type: {
        type: String,
        required: true
    },
    // Date of the game, default to current date
    date: {
        type: Date,
        default: Date.now
    },
    // Duration of the game in minutes
    duration: {
        type: Number,
        required: true
    },
    // Maximum number of participants allowed in the game
    capacity: {
        type: Number,
        required: true
    },
    // Participants who attended the game along with their average ratings
    participants: [{
        // Participant who attended the game, referenced to User model
        participant: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        // Game rating given by the participant for this game
        sessionScore: {
            type: Number,
            required: true
        },
    }],
});

const Game = mongoose.models.Game || mongoose.model("Game", gameSchema);

export default Game;
