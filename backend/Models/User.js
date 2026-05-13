//This is our schema
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    bestWPM: {
        type: Number,
        default: 0
    },
    bestAccuracy: {
        type: Number,
        default: 0
    },
    bestSurvivalTime: {
        type: Number,
        default: 0
    }
});

const UserModel = mongoose.model('users', UserSchema); //'users' is the collection name connected to user schema that we created
module.exports = UserModel;