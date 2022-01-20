const express = require("express");
const userController = require('../controllers/user');

const userRouter = express.Router();
const { verifyUser } = require('../../authenticate');

userRouter.route('/')
    .post(userController.createUser) // creating a new user object
    .get(verifyUser, userController.getAllUsers) // get all users

userRouter.route('/:id')
    .get( verifyUser,userController.getUserById) // get user by id
    
module.exports = userRouter;
