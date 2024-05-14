import mongoose from "mongoose";

const sessionSchema = new mongoose.Schema({

    // Title of the session
    title: {
        type: String,
        required: true
    },
    type: {  // Type of the session , e.g. "15min", "30min", "45min"
        type: String,
        required: true
    },
    // Date of the session, default to current date
    date: {
        type: Date,
        default: Date.now
    },
    // Participants who attended the session along with their average ratings
    participants: [{
        // Participant who attended the session, referenced to User model
        participant: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        // Session rating given by the participant for this session
        sessionScore: {
            type: Number,
            required: true
        },
    }],
 
});

const Session = mongoose.model("Session", sessionSchema);

export default Session;
