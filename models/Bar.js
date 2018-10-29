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

barSchema.post('remove', function(doc) {
    this.model('Beer').find(
        {bars: doc._id},
        function(err, beers) {
            beers.forEach(function(beer) {
                beer.bars.remove(doc._id);
                beer.save();
            });
        }
    );
});

module.exports = mongoose.model('Bar', barSchema);