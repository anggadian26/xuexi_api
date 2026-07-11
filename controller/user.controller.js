const { User } = require('../models')


// -- CREATE USER (Sign Up)
function signup(req, res, next){
   const data = {
      username: req.body.username,
      password: req.body.password,
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
            if(user.password == req.body.password) {
               res.status(200).json({
                  message: 'Success',
                  data: user
               })
            } else {
               res.status(401).json({
                  message: 'Wrong Password',
                  data: user
               })
            }
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