var express = require('express');
var router = express.Router();

const userController  = require('../controller/user.controller')
const authMiddleware = require('../middlewares/auth')

/* GET users listing. */
router.get('/', authMiddleware.auth, userController.read);
router.post('/', userController.signup);
router.get('/:id', authMiddleware.auth, userController.readById);
router.patch('/:id', authMiddleware.auth,userController.update);
router.delete('/:id', authMiddleware.auth,userController.destroy);
router.post('/signin', userController.signin);

module.exports = router;
