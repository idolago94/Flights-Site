var express = require('express');
var router = express.Router();
var usersController = require('../modules/users.controller');


/* GET users listing. */
router.get('/', async function(req, res, next) {
    var result = await usersController.getAllUsers();
    res.json(result);
});

router.get('/byUsername/:username', async function(req, res, next) {
    var result = await usersController.getUserByUsername(req.params.username);
    res.json(result);
});

router.get('/:id', async function(req, res, next) {
    var result = await usersController.getUserById(req.params.id);
    res.json(result);
});

router.post('/', async function(req, res, next) {
  var result = await usersController.addUser(req.body);
  res.json(result);
});

router.put('/:id', async function(req,res) {
  var result = await usersController.addFollow(req.params.id, req.body.vacations);
  res.json(result);
});

module.exports = router;
