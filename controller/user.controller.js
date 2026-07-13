const { User } = require('../models')
const Validator = require("fastest-validator");
const bcrypt = require('bcrypt');
const v = new Validator();
const jwt = require('jsonwebtoken');
require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET

// -- CREATE USER (Sign Up)
function signup(req, res, next){

   // enkripsi data
   bcrypt.genSalt(10, function(err, salt) {
      bcrypt.hash(req.body.password, salt, function(err, hash) {
         
         const data = {
            username: req.body.username,
            password: hash,
            email: req.body.email,
            fullname: req.body.fullname,
            picture: req.body.picture,
            bio: req.body.bio,
            createdAt: new Date(),
            updatedAt: new Date(),
            createdBy: 0,
            updatedBy: 0,
            isDeleted: false
         }
      
         const schema = {
            username: { type: "string", min: 5, max: 50, optional: false},
            email: { type: "email", optional: false},
            password: { type: "string", min: 5, max: 225, optional: false},
         }
      
         // -- Cek Email
         User.findOne({ where: {email: req.body.email} }).then(user => {
            if(user) {
               //  email sudah digunakan
               res.status(400).json({
                  message: 'Email already exist',
               })
            } else {
               // penggunaan validasi 
               const validationResult = v.validate(data, schema);
      
               if (validationResult !== true) {
                  res.status(400).json({
                     message: 'Validation Failed',
                     data: validationResult
                  });
               } else {
                  // create user
                  User.create(data).then(result => {
                     res.status(201).json({
                        message: 'Success',
                        data: result
                     })
                  }).catch(err => {
                     res.status(500).json({
                        message: 'Register Failed',
                        data: err
                     })
                  })
               }
            }
         }).catch(err => {
            res.status(500).json({
               message: 'Something wrong',
               data: err
            })
         });
      })
   })
}
// -- READ USER 
function read(req, res, next) {
   User.findAll({
      where: {isDeleted: false}
   }).then(users => {
      res.send(users)
   }).catch(err => {
      res.send(err)
   });
}
// -- READ USER BY ID
function readById(req, res, next) {
   // --- Dipakai jika tidak menggunakan PK 
   // User.findAll({
   //    where: {id: req.params.id}
   // }).then(users => {
   //    res.send(users)
   // }).catch(err => {
   //    res.send(err)
   // });

   const id = req.params.id
   User.findByPk(id).then(users => {
      res.send(users)
   }).catch(err => {
      res.send(err)
   })
}
// -- UPDATE USER 
function update(req, res, next) {
   const data = {
      username: req.body.username,
      password: req.body.password,
      email: req.body.email,
      fullname: req.body.fullname,
      picture: req.body.picture,
      bio: req.body.bio,
      updatedAt: new Date(),
      updatedBy: 0,
      isDeleted: false
   }

   const schema = {
      username: { type: "string", min: 5, max: 50, optional: false},
      email: { type: "email", optional: false},
      password: { type: "string", min: 5, max: 225, optional: false},
   }

   // Validasi Data
   const validationResult = v.validate(data, schema);

   if (validationResult !== true) {
      res.status(400).json({
         message: 'Validation Failed',
         data: validationResult
      });
   } else {
      User.update(data, {where: {id: req.params.id}}).then(result => {
         res.status(200).json({
            message: 'Success Update Data',
            data: result
         })
      }).catch(err => {
         res.status(500).json({
            message: 'Update Failed',
            data: err
         })
      })
   }

}
// -- DELETE USER
function destroy(req, res, next) {
   // -- DELETE RECORD
   // User.destroy({where: {id: req.params.id}}).then(result => {
   //    res.status(200).json({
   //       message: 'Deleted Data',
   //       data: result
   //    })
   // }).catch(err => {
   //    res.status(500).json({
   //       message: 'Delete Failed',
   //       data: err
   //    })
   // })

   // DELETE SOFT 
   const data = {
      isDeleted: true,
      deletedAt: new Date(),
      deletedBy: 1
   }

   User.update(data, {where: {id: req.params.id}}).then(result => {
      res.status(200).json({
         message: 'Success Delete Data',
         data: result
      })
   }).catch(err => {
      res.status(500).json({
         message: 'Delete Failed',
         data: err
      })
   })
}
// -- SIGN IN
function signin(req, res, next) {
   User.findOne({where: {email: req.body.email}}).then(user => {
      if(user) {
         if(user.isDeleted == false){
            bcrypt.compare(req.body.password, user.password, function(err, result) {
               if(result) {
                  const token = jwt.sign({
                     email: user.email,
                     username: user.username,
                     userid: user.id
                  }, JWT_SECRET, function(err, token){
                     res.status(200).json({
                        status: "SUCCESS",
                        message: 'Success Login',
                        token: token,
                        JWT_SECRET: JWT_SECRET
                     })
                  })
               } else {
                  res.status(401).json({
                     status: "FAILED",
                     message: "Wrong Password",
                     data: err
                  })
               }
            })
         } else {
            res.status(401).json({
               message: 'User has been deleted',
               data: user
            })
         }
      } else {
         res.status(401).json({
            message: 'Email not Found',
            data: user
         })
      }
   }).catch(err => {
      res.status(500).json({
         message: 'Login failed',
         data: err
      })
   })
} 


module.exports = {
   signup,
   read, 
   readById,
   update,
   destroy,
   signin
}