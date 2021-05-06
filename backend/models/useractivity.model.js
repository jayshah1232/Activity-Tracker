const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const useractivitySchema = new Schema({
    username: {type: String, required: true, unique: true },
    activities: [{
        description: {type: String},
        totalTime: {type: Number}
    }]
}, {
    timestamps: true
});

const UserActivities = mongoose.model('UserActivities', useractivitySchema);

module.exports = UserActivities;