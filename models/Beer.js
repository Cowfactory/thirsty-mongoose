const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    comment: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

const beerSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    style: {
        type: String,
        required: true
    },
    bars: [{ type: Schema.Types.ObjectId, ref: 'Bar' }], 
    comments: [commentSchema]
}, {
    timestamps: true
});

module.exports = mongoose.model('Beer', beerSchema);