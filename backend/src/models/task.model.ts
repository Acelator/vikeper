import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
    userId: {
        type: String,
        required: true
    },
    collectionId: {
        type: String,
        required: false
    },
    sharedWith: {
        type: String,
        required: false
    },
    archived: {
        type: Boolean,
        required: true
    },
});

export default mongoose.model('task', taskSchema);
