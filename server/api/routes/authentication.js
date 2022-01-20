const passport = require("passport");
const express = require("express");
require('dotenv').config();

const userController = require('../controllers/userController');
const { verifyUser } = require('../../authenticate');

const router = express.Router();

/**
 * Route for user signup
 */
router.route('/signup').post(userController.register);

/**
 * Route for user login
 */
router.route('/login').post(passport.authenticate("local"), userController.login);

/**
 * Route for refreshing bearer token
 */
router.route('/refreshToken').post(userController.refreshToken);

/**
 * Route for sending email confirmation based on email secret
 */
router.route('/confirmation/:token/:id').get(userController.emailConfirmation);

/**
 * Route for user logging out
 */
router.route('/logout').get(verifyUser, userController.logout);

module.exports = router;