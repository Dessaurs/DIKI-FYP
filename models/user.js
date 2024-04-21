import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, trim: true, lowercase: true },
    password: { type: String, required: true, minLength: 8 },
});

export const User = mongoose.model('User', userSchema);
