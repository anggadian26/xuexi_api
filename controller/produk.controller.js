const { Produk } = require('../models')
const Validator = require("fastest-validator");
const v = new Validator();


const readAllProduk = async (req, res) => {
   try {
      const data = await Produk.findAll({where: {isDeleted: false}})

      return res.json({
         message: "Get All Produk",
         data: data
      })
   } catch (err) {
      res.status(500).json({
         message: "Server Error",
         serverMessage: error
      })
   }
}

const readByIdProduk = (req, res) => {

}

const addProduk = async (req, res) => {
   const userId = req.user ? req.user.userid : 0;

   try {
      const data = {
         nama_produk: req.body.nama_produk,
         ctgr_produk: req.body.ctgr_produk,
         merek_produk: req.body.merek_produk,
         createdAt: new Date(),
         updatedAt: new Date(),
         createdBy: userId,
         updatedBy: userId,
         isDeleted: false
      }

      const schema = {
         nama_produk: { type: "string", min: 5, max: 100, optional: false },
         ctgr_produk: { type: "string", min: 5, max: 100, optional: false },
         merek_produk: { type: "string", min: 5, max: 90, optional: false }
      }

      // validasi data
      const validationResult = v.validate(data, schema);
      if (validationResult !== true) {
         return res.status(400).json({
            message: 'Validation Failed',
            data: validationResult
         });
      }

      // cek existing data
      const existingProduk = await Produk.findOne({ where: { nama_produk: req.body.nama_produk } })
      if (existingProduk) {
         return res.status(400).json({
            message: 'Produk already exist'
         });
      }

      const result = await Produk.create(data);
      
      return res.status(201).json({
         message: "Success",
         data: result
      });

   } catch (err) {
      res.status(500).json({
         message: 'Something wrong',
         data: err
      })
   }
}

const updateProduk = (req, res) => {

}

const deleteProduk = (req, res) => {

}


module.exports = {
   readAllProduk,
   readByIdProduk,
   addProduk,
   updateProduk,
   deleteProduk
}