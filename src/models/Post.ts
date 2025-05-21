import { create } from "domain";
import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
    name: {type:String, required: true},
    text: {type: String, required: true},
    createdAt: {type: Date, default: Date.now},
});

export default mongoose.models.Post || mongoose.model("Post", PostSchema);