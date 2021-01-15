import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
    }
})

const todo = mongoose.model('ToDo', todoSchema);
export {todo}

