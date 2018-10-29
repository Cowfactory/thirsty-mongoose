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
        Beer.findById(req.params.id).populate('comments')
            .exec((err, beer) => {
                if(err) return next(err);
                res.render('beers/show', { beer });
            });
    },
    // VERB: GET | URL: /beers/<id>/edit | VIEW: beers/index 
    edit: function(req, res, next) {
        Beer.findById(req.params.id, function(err, beer) {
            if(err) return next(err);
            res.render('beers/edit', { beer });
        })
    },
    // VERB: PUT | URL: /beers/<id> | VIEW: beers/edit 
    update: function(req, res, next) {
        Beer.findById(req.params.id, (err, beer) => {
            if(err) return next(err);
            beer.name = req.body.name;
            beer.style = req.body.style;
            beer.save(err => {
                if(err) return next(err);
            });
            res.redirect('/beers/' + beer._id);
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
    },
    addComment: function(req, res, next) {
        Beer.findById(req.params.id, (err, beer) => {
            if(err) return next(err);
            let comment = {comment: req.body.content};
            beer.comments.push(comment);
            beer.save(err => {
                if(err) return next(err);
                res.redirect(`/beers/${beer.id}`);
            })
        });
    },
    removeComment: function(req, res, next) {
        Beer.findById(req.params.id, (err, beer) => {
            if(err) return next(err);
            
            // beer.comments.remove()
        });
    }
}
