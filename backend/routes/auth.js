const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();

const admin = {
    email: 'kalitkin03@list.ru',
    username: 'Администратор',
    password: '621706'
};

router.post('/register', async (req, res) => {
    const { email, username, password } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ success: false, message: 'Пользователь уже существует' });

        const hashedPassword = await bcrypt.hash(password, 12);
        const user = new User({ email, username, password: hashedPassword });

        await user.save();
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Ошибка сервера' });
    }
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    if (email === admin.email && password === admin.password) {
        res.json({ success: true, user: admin });
    } else {
        try {
            const user = await User.findOne({ email });
            if (!user) return res.status(400).json({ success: false, message: 'Пользователь не найден' });

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) return res.status(400).json({ success: false, message: 'Неправильный пароль' });

            res.json({ success: true, user });
        } catch (error) {
            res.status(500).json({ success: false, message: 'Ошибка сервера' });
        }
    }
});

router.get('/users', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ success: false, message: 'Ошибка сервера' });
    }
});

module.exports = router;
