const nodemailer = require('nodemailer');
const userService = require('../services/user');

require('dotenv').config();

//Email confirmation for Email confirmation API
const EMAIL_SECRET = 'asdf1093KMnzxcvnkljvasdu09123nlasdasdf';

/**
 * Creating an instance of Transport of Nodemailer
 */
const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS
    },
});

/**
 * User sign up / register
 * @param {Request} req 
 * @param {Response} res 
 */
exports.register = (req, res) => {
    // Verify that first name is not empty
    if (!req.body.firstName) {
        res.statusCode = 500;
        res.send({
            name: "FirstNameError",
            message: "First name is required",
        });
    } else {
        userService.registerUser(req, res, transporter, EMAIL_SECRET);
    }
}

/**
 * 
 * @param {Request} req 
 * @param {Response} res 
 * @param {*} next 
 */
exports.login = (req, res, next) => {
    userService.loginUser(req, res, next);
}

/**
 * Creating refresh tokens for signed in user
 * @param {Request} req 
 * @param {Response} res 
 * @param {*} next 
 */
exports.refreshToken = (req, res, next) => {
    userService.refreshToken(req, res, next);
}

/**
 * Logging out signed in user
 * @param {Request} req 
 * @param {Response} res 
 * @param {*} next 
 */
exports.logout = (req, res, next) => {
    userService.logout(req, res, next);
}

/**
 * Sending email confirmation after user registeration
 * @param {Request} req 
 * @param {Response} res 
 */
exports.emailConfirmation = (req, res) => {
    userService.emailConfirmation(req, res, EMAIL_SECRET);
}