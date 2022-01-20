const mongoose = require("mongoose");

// models are defined through the schema interface.
const PlanSchema = new mongoose.Schema({
    "name": {
        type: String,
        required: "Name is required field"
    },
    // stores reference of user object that created this plan
    "createdBy": {
        type: mongoose.Schema.Types.ObjectId, ref: 'User',
        required: "CreatedBy is a required field."
    },
    // stores an array of user object references
    "members": [{
        type: mongoose.Schema.Types.ObjectId, ref: 'User'
    }],
    // stores an array of task object references that belong to this plan
    "tasks": [{
        type: mongoose.Schema.Types.ObjectId, ref: 'Task'
    }],
    // create date value cannot be changed
    "createDate": {
        type: Date,
        default: Date.now,
        immutable: true
    },
    "lastModifiedDate": {
        type: Date,
        default: Date.now
    }
}, {
    versionKey: false,
});

// creating a virtual attribute, naming it as 'id'
// id will contain value of _id field
PlanSchema.virtual('id', () => {
    return this._id.toHexString();
})

// adding a compound index, an owner can create only one plan of same name
PlanSchema.index({ "name": 1, "createdBy": 1}, { "unique": true });

// when converting Plan document to JSON, include virtual fields like id in it
// by default JSON value of objects dont contain virtual fields
PlanSchema.set('toJSON', { virtuals: true })

exports.Plan = mongoose.model("Plan", PlanSchema);
