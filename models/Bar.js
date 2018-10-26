const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const barSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    beers: [{ type: Schema.Types.ObjectId, ref: 'Beer' }]
}, {
    timestamps: true
});

module.exports = mongoose.model('Bar', barSchema);