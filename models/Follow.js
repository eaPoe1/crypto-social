import mongoose from "mongoose";

const followSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    followed: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

const Follow = mongoose.model('Follow', followSchema);
export default Follow;