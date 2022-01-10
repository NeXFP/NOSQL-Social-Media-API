const { Schema, model, Types } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const ReactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId(),
        },
        reactionBody: {
            type: String,
            required: 'Please enter a reaction!',
            maxlength: 180
        },
        username: {
            type: String,
            required: 'Please enter a username!',
            trim: true
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: createdAtVal => dateFormat(createdAtVal)
        }
    },
    {
        toJSON: {
            getters: true
        }
    }
)

const ThoughtSchema = new Schema(
    {
        
        username: {
            type: String,
            required: true,
            trim: true
        },
        thoughtText: {
            type: String,
            required: 'Please enter your thoughts here!',
            minlength: 1,
            maxlength: 180
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: createdAtVal => dateFormat(createdAtVal)
        },
        reactions: [ReactionSchema]
    },
    {
        toJSON: {
            getters: true,
            virtuals: true
        },
        id: false
    }
)

ThoughtSchema.virtual("reactionCount").get(function () {
    return this.reactions.length;
  });

const Thought = model('Thought', ThoughtSchema)

module.exports = Thought