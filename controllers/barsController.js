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
    new: function(req, res, next) {
        res.render('bars/new');
    },
    // VERB: POST | URL: /bars | VIEW: bars/index 
    create: function(req, res) {
        let name = req.body.name.trim();
        let location = req.body.location.trim();
        Bar.create({ name, location })
            .then(() => {
                res.redirect('/bars');
            })
            .catch((err) => {
                return next(err);
            });
    },
    // VERB: GET | URL: /bars/<id> | VIEW: bars/show 
    show: function(req, res, next) {
        Bar.findById(req.params.id)
            .then((bar) => {
                res.render('bars/show', { bar });
            })
    },
    // VERB: GET | URL: /bars/<id>/edit | VIEW: bars/index 
    edit: function(req, res, next) {
        Bar.findById(req.params.id)
            .then((bar) => {
                res.render('bars/edit', { bar });
            })
            .catch((err) => {
                return next(err);
            });
    },
    // VERB: PUT | URL: /bars/<id> | VIEW: bars/index 
    update: function(req, res, next) {
        Bar.findById(req.params.id) 
            .then((bar) => {
                bar.name = req.body.name;
                bar.location = req.body.location;
                bar.save();
                res.redirect('/bars/' + bar._id);
            })
            .catch((err) => {
                return next(err);
            });
    },
    addBeer: function(req, res, next) {
        
    },
    removeBeer: function(req, res, next) {

    },
    // VERB: DELETE | URL: /bars/<id> | VIEW: bars/index 
    destroy: function(req, res, next) {
        Bar.remove({ _id: req.params.id }) 
            .then(() => {
                res.redirect('/bars');
            })
            .catch((err) => {
                return next(err);
            });
    }
}
