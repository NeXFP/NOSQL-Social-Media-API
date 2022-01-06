const { Schema, model } = require('mongoose');


const UsersSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: 'Please enter a username!',
            trim: true,

        },
        email: {
            type: String,
            required: 'Please enter a valid email address!',
            unique: true,
            validate: {
                validator(validEmails) {
                  return /^([a-zA-Z0-9_\.-]+)@([\da-z\.-]+)\.([a-z]{2,6})(\.[a-z]{2,6})?$/.test(
                    validEmails
                  );
                },
                message: "Please enter a valid email address!",
              },
        },
        thoughts: [{
            type: Schema.Types.ObjectId,
            ref: 'Thought'
        }],
        friends: [{
            type: Schema.Types.ObjectId,
            ref: 'User'
        }]
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false
    }
);


UsersSchema.virtual('friendCount').get(function () {
    return this.friends.length
})


const User = model('User', UsersSchema)

module.exports = User