const Group = require('../Models/groupModel');

exports.createGroup = async (req, res) => {
    try {
        const { name, description } = req.body;
        const userId = req.userId;

        // Create a new group
        const newGroup = new Group({
            name,
            description,
            owner: userId,
            members: [userId],
        });

        // Save the group to the database
        await newGroup.save();

        res.status(201).json({ message: 'Group created successfully', group: newGroup });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

exports.getUserGroups = async (req, res) => {
    try {
        const userId = req.userId;

        // Find groups where the user is a member
        const userGroups = await Group.find({ members: userId });

        res.status(200).json({ userGroups });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

exports.getGroupDetails = async (req, res) => {
    try {
        const groupId = req.params.groupId;

        // Find the group by ID and populate members and messages
        const group = await Group.findById(groupId)
            .populate('owner', 'username')
            .populate('members', 'username')
            .populate('messages.sender', 'username');

        if (!group) {
            return res.status(404).json({ message: 'Group not found' });
        }

        res.status(200).json({ group });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};