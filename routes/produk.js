var express = require('express');
var router = express.Router();

const produkController = require('../controller/produk.controller')
const authMiddleware = require('../middlewares/auth')

router.get('/', produkController.readAllProduk);
router.get('/:id', produkController.readByIdProduk);
router.post('/', authMiddleware.auth, produkController.addProduk);
router.patch('/:id', authMiddleware.auth, produkController.updateProduk);
router.delete('/:id', authMiddleware.auth, produkController.deleteProduk);


module.exports = router;