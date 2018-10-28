const Bar = require('../models/Bar');

module.exports = {
    // VERB: GET | URL: /bars | VIEW: bars/index 
    index: function(req, res, next) {
        Bar.find({})
            .then((bars) => {
                res.render('bars/index', { bars });
            })
            .catch((err) => {
                return next(err);
            });
    },
    // VERB: GET | URL: /bars/new | VIEW: bars/new 
    new: function(req, res) {
        res.render('bars/new');
    },
    // VERB: POST | URL: /bars | VIEW: bars/index 
    create: function(req, res) {

    },
    // VERB: GET | URL: /bars/<id> | VIEW: bars/show 
    show: function() {

    },
    // VERB: GET | URL: /bars/<id>/edit | VIEW: bars/index 
    edit: function() {

    },
    // VERB: PUT | URL: /bars/<id> | VIEW: bars/index 
    update: function() {

    },
    addBeer: function(req, res, next) {
        
    },
    // VERB: DELETE | URL: /bars/<id> | VIEW: bars/index 
    destroy: function() {

    }
}
