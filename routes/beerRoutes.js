var express = require('express');
var router = express.Router();
var beers = require('../controllers/beersController');

// VERB: GET | URL: /beers | VIEW: beers/index 
router.get('/', beers.index);

// VERB: GET | URL: /beers/new | VIEW: beers/new 
router.get('/new', beers.new);

// VERB: POST | URL: /beers | VIEW: beers/index 
router.post('/', beers.create);

// VERB: GET | URL: /beers/<id> | VIEW: beers/show 
router.get('/:id', beers.show);

// VERB: GET | URL: /beers/<id>/edit | VIEW: beers/index 
router.get('/:id/edit', beers.edit);

// VERB: PUT | URL: /beers/<id> | VIEW: beers/index 
router.put('/:id', beers.update);

// VERB: DELETE | URL: /beers/<id> | VIEW: beers/index 
router.delete('/:id', beers.destroy);

module.exports = router;