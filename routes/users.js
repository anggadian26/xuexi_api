var express = require('express');
var router = express.Router();

const userController  = require('../controller/user.controller')

/* GET users listing. */
router.get('/', userController.read);
router.post('/', userController.signup);
router.get('/signin', userController.signin);
router.get('/update/:id', userController.update);
router.get('/delete/:id', userController.destroy);
router.get('/:id', userController.readById);

module.exports = router;
