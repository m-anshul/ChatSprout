const express = require('express');
const router = express.Router();
const authMiddleware = require('../Middlewares/authMiddleware');

router.get('/protected-route', authMiddleware, (req, res) => {
    res.json({ message: 'This is a protected route', userId: req.userId });
});

module.exports = router;