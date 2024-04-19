import express from 'express';
import mongoose from 'mongoose';
import 'dotenv/config';
import leaderboard from './routes/leaderboard.js';
import user from './routes/user.js';

const app = express();

app.use('/api/v1/user', user);
app.use('/api/v1/leaderboard', leaderboard);

mongoose
    .connect(process.env.CONNECTION_STRING)
    .then(() => console.log('Database connected'))
    .catch((err) => console.log(err));

const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`Server is running on port ${port}`));
