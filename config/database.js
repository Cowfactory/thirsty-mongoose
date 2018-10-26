var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/thirstyMongoose',
    {useNewUrlParser: true}
);

mongoose.connection.on('open', function() {
    
});