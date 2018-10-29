const Bar = require('../models/Bar');
const Beer = require('../models/Beer')

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
        Promise.all([
            Bar.findById(req.params.id).populate('beers').exec(),
            Beer.find({}).exec()
        ])
        .then(queryResult => {
            let bar = queryResult[0];
            let beerList = queryResult[1];
            res.render('bars/show', { bar, beerList });
        })
        .catch(err => {
            return next(err);
        });
        
            // .then((bar) => {
            //     res.render('bars/show', { bar });
            // })
            // .catch((err) => {
            //     return next(err);
            // }) 
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
        Promise.all([
            Bar.findById(req.params.id).exec(),
            Beer.findById(req.body.newBeer).exec()
        ])
        .then(queryResult => {
            console.log("?:)");
            let bar = queryResult[0];
            let beer = queryResult[1];
            console.log(bar, beer);
            bar.beers.push(beer);
            bar.save();
            res.redirect("/bars/" + bar._id);
        })
        .catch(err => next(err) );

        // Bar.findById(req.params.id).exec()
        //     .then((bar) => {
        //         Beer.findById(req.body.beer)
        //             .then((beer) => {
        //                 bar.beers.push(beer);
        //                 bar.save();
        //                 res.redirect('/bars/' + req.params.id);
        //             })
        //     })
            
        //     .catch((err) => {
        //         return next(err);
        //     });
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
