const Beer = require('../models/Beer');

module.exports = {
    // VERB: GET | URL: /beers | VIEW: beers/index 
    index: function(req, res, next) {
        Beer.find({})
            .then((beers) => {
                res.render('beers/index', { beers });
            })
            .catch((err) => {
                return next(err);
            });
    },
    // VERB: GET | URL: /beers/new | VIEW: beers/new 
    new: function(req, res) {
        res.render('beers/new');
    },
    // VERB: POST | URL: /beers | VIEW: beers/index 
    create: function(req, res, next) {
        // let name = req.body.name.replace(/\s*\S*\s*/g, ' ');
        // let style = req.body.style.replace(/\s*\S*\s*/g, ' ');
        let name = req.body.name.trim();
        let style = req.body.style.trim();
        Beer.create({ name, style })
            .then(() => {
                res.redirect('/beers');
            })
            .catch((err) => {
                return next(err);
            });
    },
    // VERB: GET | URL: /beers/<id> | VIEW: beers/show 
    show: function(req, res, next) {
        Beer.findById(req.params.id).populate('comments').exec()
            .then((beer) => {
                res.render('beers/show', { beer });
            })
            .catch((err) => {
                return next(err);
            })
    },
    // VERB: GET | URL: /beers/<id>/edit | VIEW: beers/index 
    edit: function(req, res, next) {
        Beer.findById(req.params.id)
            .then((beer) => {
                res.render('beers/edit', { beer });
            })
            .catch((err) => {
                return next(err);
            })
        
    },
    // VERB: PUT | URL: /beers/<id> | VIEW: beers/edit 
    update: function(req, res, next) {
        Beer.find({})
            .then((beer) => {
                beer.name = req.body.name;
                beer.style = req.body.style;
                beer.save();
                res.redirect('/beers/' + beer._id);
            })
            .catch((err) => {
                return next(err);
            })
    },
    // VERB: DELETE | URL: /beers/<id> | VIEW: beers/index 
    destroy: function(req, res, next) {
        Beer.remove({ _id: req.params.id })
            .then(() => {
                res.redirect('/beers');
            })
            .catch((err) => {
                return next(err);
            })
    }
}
