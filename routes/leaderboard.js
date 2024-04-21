import bodyParser from 'body-parser';
import { Leaderboard } from '../models/leaderboard.js';
import { Router } from 'express';

const router = Router();
const jsonParser = bodyParser.json();

router.get('/', async (req, res) => {
    let filter;
    if (req.query.category) filter = { category: req.query.category };
    const leaderboard = await Leaderboard.find(filter).sort({ wordsPerMinute: -1 }).populate('user');
    leaderboard ? res.status(200).send(leaderboard) : res.status(500).send('Empty leaderboard');
});

router.post('/', jsonParser, (req, res) => {
    const entry = new Leaderboard({
        user: req.body.user,
        wordsPerMinute: req.body.wordsPerMinute,
        category: req.body.category,
    });
    entry
        .save()
        .then((addedEntry) => res.status(201).send(addedEntry))
        .catch((error) => res.status(500).send(error));
});

export default router;
