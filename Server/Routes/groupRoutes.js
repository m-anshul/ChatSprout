const express = require('express');
const router = express.Router();
const GroupController = require('../Controllers/groupController');
const authMiddleware = require('../Middlewares/authMiddleware');

// Route to get groups for the logged-in user
router.get('/user-groups', authMiddleware, GroupController.getUserGroups);

// Route to get details of a specific group
router.get('/:groupId/details', authMiddleware, GroupController.getGroupDetails);

// Route to create a new group
router.post('/create', authMiddleware, GroupController.createGroup);

// Add more routes as needed

module.exports = router;