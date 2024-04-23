import bodyParser from 'body-parser';
import { Leaderboard } from '../models/leaderboard.js';
import { User } from '../models/user.js';
import { Router } from 'express';

const router = Router();
const jsonParser = bodyParser.json();

router.get('/', async (req, res) => {
    let filter;
    if (req.query.category) filter = { category: req.query.category };
    const leaderboard = await Leaderboard.find(filter)
        .sort({ wordsPerMinute: -1, mistake: 1 })
        .populate({
            path: 'user',
            select: 'username -_id',
        })
        .select('wordsPerMinute mistake timestamp -_id');
    leaderboard ? res.status(200).send(leaderboard) : res.status(500).send('Empty leaderboard');
});

router.post('/', jsonParser, async (req, res) => {
    const user = await User.findOne({ username: req.body.username }).select('_id');
    if (user) {
        const entry = new Leaderboard({
            user: user,
            wordsPerMinute: req.body.wordsPerMinute,
            mistake: req.body.mistake,
            category: req.body.category,
        });
        entry
            .save()
            .then((addedEntry) => res.status(201).send(addedEntry))
            .catch((error) => res.status(500).send(error));
    }
});

export default router;
