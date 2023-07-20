const planetscale = require('./config/planetscale');
const express = require('express');
const cors = require('cors');
const app = express();
const router = express.Router();

app.use(cors());
app.use(express.json());

const user = require('./components/user');
const search = require('./components/search');
const profilePicture = require('./components/profilePicture');
const post = require('./components/post');
const login = require('./components/login');
const likePost = require('./components/likePost');
const follow = require('./components/follow');
const comment = require('./components/comment');
const recommendation = require('./components/recommendation');

app.use(user);
app.use(search);
app.use(profilePicture);
app.use(post);
app.use(login);
app.use(likePost);
app.use(follow);
app.use(comment);
app.use(recommendation);

const PORT = 3002;

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
});

module.exports = router;