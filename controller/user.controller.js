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
   User.findAll().then(users => {
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
   res.render('index', {title: `Update User Data By ID ${req.params.id}`})
}
// -- DELETE USER
function destroy(req, res, next) {
   res.render('index', {title: `Delete User Data By ID ${req.params.id}`})
}
// -- SIGN IN
function signin(req, res, next) {
   res.render('index', {title: `Sign In`})
} 


module.exports = {
   signup,
   read, 
   readById,
   update,
   destroy,
   signin
}