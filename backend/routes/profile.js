const express = require('express');
const User = require('../models/User');
const router = express.Router();

router.post('/update', async (req, res) => {
    const { email, username, newEmail, newUsername } = req.body;

    try {
        const user = await User.findOne({ email, username });
        if (!user) return res.status(400).json({ success: false, message: 'Пользователь не найден' });

        user.email = newEmail;
        user.username = newUsername;
        await user.save();

        res.json({ success: true, user });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Ошибка сервера' });
    }
});

module.exports = router;
