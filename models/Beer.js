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

beerSchema.post('remove', function(doc) {
    this.model('Bar').find(
        {beers: doc._id},
        function(err, bars) {
            bars.forEach(function(bar) {
                bar.beers.remove(doc._id);
                bar.save();
            });
        }
    );
});

module.exports = mongoose.model('Beer', beerSchema);