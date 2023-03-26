var express = require('express');
var router = express.Router();
var UserController = require('../controllers/userController/userController');
var RestaurantHouseController = require('../controllers/restaurantHouseController/restaurantHouseController');
var ChefController = require('../controllers/chefController/chefController');


const auth = require("../middleware/auth");


// USER ROUTES
router.post('/user', UserController.createUser);
router.post('/login', UserController.login);
router.post('/verifyOtp', UserController.verifyOtp);
router.get('/verify/:token', UserController.EmailConfirmation);


// RESTAURANTHOUSE ROUTES
router.get('/restaurantHouse',auth, RestaurantHouseController.getRestaurantHouse);
router.post('/restaurantHouse',auth, RestaurantHouseController.CreateRestaurantHouse);
router.put('/restaurantHouse',auth, RestaurantHouseController.UpdateRestaurantHouse);
router.delete('/restaurantHouse',auth, RestaurantHouseController.DeleteRestaurantHouse);

// CHEF ROUTES
router.get('/allchefs',auth, ChefController.getAllChefs);
router.get('/chef',auth, ChefController.getChef);
router.post('/chef',auth, ChefController.CreateChef);
router.put('/chef',auth, ChefController.UpdateChef);
router.delete('/chef',auth, ChefController.DeleteChef);



module.exports = router;
