var express = require('express');
var userController = require('../controllers/users')
var securityMiddleware = require('../middlewares/security')

var router = express.Router();


/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

router.get("/", userController.getUsers);

router.get("/", securityMiddleware.checkPermission, userController.getUsers);
router.get("/login", userController.getLoginDetails);
router.post("/login", userController.loginUser);

router.post("/create-user", userController.createUser); // add this route

router.post("/logout", securityMiddleware.checkJWT, userController.logoutUser);


module.exports = router;

// to test on postman
// {
//     "first_name": "John",
//     "last_name": "Doe",
//     "username": "john.doe",
//     "email": "johndoe@example.com",
//     "password": "aSecurePassword123"
// }