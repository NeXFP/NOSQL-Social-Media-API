const { Thought, User, Types } = require('../models');
const { startSession, findOneAndDelete } = require('../models/User');

const ThoughtControllers = {
    getAllThoughts(req, res) {
        Thought.find({})
        .select('-__v')
        .sort({_id: -1})
        .then((dbThoughtData) => res.json(dbThoughtData))
        .catch((err) => {
            res.status(400).json(err);
        });
    },

    getThoughtsById({ params }, res) {
        Thought.findOne({ _id: params.id })
        .select('-__v')
        .then((dbThoughtData) => {
            if (!dbThoughtData) {
                res.status(404).json({ message: 'No thoughts found that share this id.'});
                return;
            }
            res.json(dbThoughtData);
        })
        .catch((err) => {
            res.status(400).json(err);
        });
    },
    createThought({ params, body} , res) {
        Thought.create(body)
        .then(({ _id }) => {
            return User.findOneAndUpdate(
                { _id: params.userId },
                { $push: { thoughts: _id } },
                { new: true }
            );
        })
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'No Users werew found with this id.'})
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => res.json(err));
    },
    deleteThought({ params }, res) {
        Thought,findOneAndDelete({ _id: params.id})
        .then(deleteThought => {
            if (!deleteThought) {
                return res.status(404).json({message: 'No thoughts found with this id.'});
            }
            return User.findOneAndUpdate(
                { _id: params.userId },
                { $pull: { thoughts: params.id } },
                { new: true }
            );
        })
        .then(dbUserData => {
            res.json(dbUserData);
        })
        .catch(err => res.json(err));
    },
    addReactions({ params, body }, res) {
        Thought.findOneAndUpdate(
            { _id: params.id },
            { $push: { reactions: body }},
            { new: true }
        )
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No users found with this id.' });
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => res.json(err));
    },
    removeReaction({ params }, res) {
        Thought.findOneAndUpdate(
            { _id: params.id },
            { $pull: { reactions: { reactionId: params.reactionId } } },
            { new: true }
        )
            .then(dbUserData => res.json(dbUserData))
            .catch(err => res.json(err));
    }
};