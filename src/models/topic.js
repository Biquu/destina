import mongoose from "mongoose";

const topicSchema = new mongoose.Schema({
    // Name of the topic
    name: {
        type: String,
        required: true,
        unique: true // Ensures each topic name is unique
    },

    // Subtopic part didn't include in the initial schema, we can add it later

    // Optional: Description about the topic
    description: {
        type: String // Description about the topic (optional)
    }
});

const Topic = mongoose.model('Topic', topicSchema);

export default Topic;
