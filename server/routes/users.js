var express = require('express');
var router = express.Router();
const userController = require('../controllers/userController');

//http://localhost:4000/users/signin
router.post('/signin', userController.signin);

//localhost:4000/users/login
router.post('/login', userController.login);


module.exports = router;
