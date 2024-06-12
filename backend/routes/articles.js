const express = require('express');
const Article = require('../models/Article');
const router = express.Router();

router.post('/', async (req, res) => {
    const { title, tags, content } = req.body;
    const pdf = req.file.path;

    try {
        const article = new Article({ title, tags, content, pdf });
        await article.save();
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Ошибка сервера' });
    }
});

router.get('/', async (req, res) => {
    try {
        const articles = await Article.find();
        res.json(articles);
    } catch (error) {
        res.status(500).json({ success: false, message: 'Ошибка сервера' });
    }
});

module.exports = router;
