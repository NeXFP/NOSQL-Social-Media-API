const { Thought, User, Types } = require('../models');
const { startSession } = require('../models/User');

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
                res.status(400).json({ message: 'No thoughts found that share this id.'});
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
            )
        })
    }
}