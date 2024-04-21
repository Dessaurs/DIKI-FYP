import bodyParser from 'body-parser';
import { User } from '../models/user.js';
import { Router } from 'express';

const router = Router();
const jsonParser = bodyParser.json();

router.post('/login', jsonParser, async (req, res) => {
    const user = await User.findOne({ username: req.body.username });
    if (user && req.body.password === user.password) {
        return res.status(200).send({ user: user._id, message: 'Successful login' });
    } else {
        return res.status(404).send('Username and password does not match');
    }
});

router.post('/register', jsonParser, async (req, res) => {
    let user = await User.findOne({ username: req.body.username });
    if (user) return res.status(403).send('Username already exist');
    if (req.body.password != req.body.password2) return res.status(401).send('Password does not match');
    user = new User({
        username: req.body.username,
        password: req.body.password,
    });
    user.save()
        .then(() => res.status(201).send('Registration successful'))
        .catch((err) => res.status(500).send('Registration fail'));
});

export default router;
