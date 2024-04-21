import mongoose from 'mongoose';

const leaderboardSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    wordsPerMinute: { type: Number, min: 0, required: true },
    timestamp: { type: Date, default: Date.now },
    category: { type: Number, required: true },
});

export const Leaderboard = mongoose.model('Leaderboard', leaderboardSchema);
