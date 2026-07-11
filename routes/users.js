var express = require('express');
var router = express.Router();

const userController  = require('../controller/user.controller')

/* GET users listing. */
router.get('/', userController.read);
router.post('/', userController.signup);
router.get('/:id', userController.readById);
router.patch('/:id', userController.update);
router.get('/signin', userController.signin);
router.get('/delete/:id', userController.destroy);

module.exports = router;
