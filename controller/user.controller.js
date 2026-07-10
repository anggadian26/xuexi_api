// -- CREATE USER (Sign Up)
function signup(req, res, next){
   res.render('index', {title: 'Sign Up User'})
}
// -- READ USER 
function read(req, res, next) {
   res.render('index', {title: 'Read User Data'})
}
// -- READ USER BY ID
function readById(req, res, next) {
   res.render('index', {title: `Read User Data By ID ${req.params.id}`})
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