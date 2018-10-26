var express = require('express');
var router = express.Router();
var bars = require('../controllers/barsController');

// VERB: GET | URL: /bars | VIEW: bars/index 
router.get('/', bars.index);

// VERB: GET | URL: /bars/new | VIEW: bars/new 
router.get('/new', bars.new);

// VERB: POST | URL: /bars | VIEW: bars/index 
router.post('/', bars.create);

// VERB: GET | URL: /bars/<id> | VIEW: bars/show 
router.get('/:id', bars.show);

// VERB: GET | URL: /bars/<id>/edit | VIEW: bars/index 
router.get('/:id/edit', bars.edit);

// VERB: PUT | URL: /bars/<id> | VIEW: bars/index 
router.put('/:id', bars.update);

// VERB: DELETE | URL: /bars/<id> | VIEW: bars/index 
router.delete('/:id', bars.destroy);

module.exports = router;