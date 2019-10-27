var express = require('express');
var router = express.Router();
var vacationsController = require('../modules/vacations.controller');

/* GET users listing. */
router.get('/', async function(req, res, next) {
    var result = await vacationsController.getAllVacations();
    res.json(result);
});

router.get('/:id', async function(req, res, next) {
    var result = await vacationsController.getVacationById(req.params.id);
    res.json(result);
});

router.post('/', async function(req, res, next) {
  var result = await vacationsController.addVacation(req.body);
  res.json(result);
});

router.delete('/:id', async function(req, res, next) {
  var result = await vacationsController.deleteVacation(req.params.id);
  res.json(result);
});

router.put('/:id', async function(req, res, next) {
    var result = await vacationsController.updateVacation(req.body, req.params.id);
    res.json(result);
});

router.put('/follow/:id', async function (req,res) {
    var result = await vacationsController.changeFollow(req.body.follow, req.params.id);
    res.json(result);
});

module.exports = router;
