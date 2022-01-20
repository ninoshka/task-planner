const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const passportLocalMongoose = require("passport-local-mongoose");
require('dotenv').config();

const Session = new Schema({
    refreshToken: {
        type: String,
        default: "",
    },
});

const User = new Schema({
    "firstName": {
        type: String
    },
    "lastName": {
        type: String,
    },
    "username": {
        type: String,
        required: "Username is a unique field.",
        lowercase: true,
        unique: true
    },
    "confirmed": {
        type: Boolean,
        default: false
    },

    // contains array of Plan objects which were created by this user
    "ownedPlans": [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Plan'
    }],
    // contains array of Plan Objects in which user is a member
    "memberPlans": [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Plan'
    }],
    "createDate": {
        type: Date,
        default: Date.now,
        immutable: true
    },
    "lastModifiedDate": {
        type: Date,
        default: Date.now,
    },
    "authStrategy": {
        type: String,
        default: "local",
    },

    "refreshToken": {
        type: [Session],
    },
}, {
    versionKey: false,
});

User.virtual('id', () => {
    return this._id.toHexString();
})

//Remove refreshToken from the response
User.set("toJSON", {
    transform: function(doc, ret, options) {
        delete ret.refreshToken;
        return ret;
    },
    virtuals: true,
});

User.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", User);