var express = require('express');
var router = express.Router();

const userController  = require('../controller/user.controller')

/* GET users listing. */
router.get('/', userController.read);
router.post('/', userController.signup);
router.get('/:id', userController.readById);
router.patch('/:id', userController.update);
router.delete('/:id', userController.destroy);
router.get('/signin', userController.signin);

module.exports = router;
