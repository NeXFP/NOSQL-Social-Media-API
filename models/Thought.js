const { Schema, model, Types } = require('mongoose');

const ReactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId()
        },
        reactionBody: {
            type: String,
            required: true,
            maxlength: 180
        },
        username: {
            type: String,
            required: true
        },
        toJSON: {
            getters: true
        }
    }
);

const ThoughtSchema = new Schema(
    {
        username: {
            type: String,
            required: true
        },
        thoughtText: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 180
        },
        reaction: [ReactionSchema]
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false
    }
);