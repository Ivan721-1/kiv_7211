const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');
const app = express();

const authRoutes = require('./routes/auth');
const articleRoutes = require('./routes/articles');
const profileRoutes = require('./routes/profile');

mongoose.connect('mongodb://localhost:27017/cinema-articles', { useNewUrlParser: true, useUnifiedTopology: true });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(multer({ dest: 'uploads/' }).single('pdf'));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/auth', authRoutes);
app.use('/articles', articleRoutes);
app.use('/profile', profileRoutes);

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
