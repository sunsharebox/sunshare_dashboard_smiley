var express = require('express');
var router = express.Router();
var consoController = require('../controllers/consoController.js');

router.get('/', consoController.index);
router.get('/teams', consoController.teams);

module.exports = router;
