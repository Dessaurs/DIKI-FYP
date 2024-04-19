import bodyParser from 'body-parser';
import { User } from '../models/user.js';
import { Router } from 'express';

const router = Router();
const jsonParser = bodyParser.json();

router.get('/', jsonParser, async (req, res) => {
    const user = await User.findOne({ username: req.body.username });
    if (user && req.body.password === user.password) {
        return res.status(200).send('Successful login');
    } else {
        return res.status(404).send('Username and password does not match');
    }
});

router.post('/', jsonParser, async (req, res) => {
    const user = await User.findOne({ username: req.body.username });
    if (user) {
        return res.status(403).send('Username already exist');
    } else {
        const user = new User({
            username: req.body.username,
            password: req.body.password,
        });
        user.save()
            .then(() => res.status(201).send('Registration successful'))
            .catch((err) => res.status(500).send('Registration fail'));
    }
});

export default router;
