var express = require('express');
var router = express.Router();
var UserController = require('../controllers/userController/userController');


const auth = require("../middleware/auth");





// USER ROUTES
router.post('/user', UserController.createUser);
router.post('/login', UserController.login);
router.post('/verifyOtp', UserController.verifyOtp);
router.get('/verify/:token', UserController.EmailConfirmation);



module.exports = router;
