const User = require("../models/user");
const jwt = require("jsonwebtoken");
require('dotenv').config();

const _ = require("lodash");
const {
    getToken,
    COOKIE_OPTIONS,
    getRefreshToken,
    verifyUser
} = require('../../authenticate');
const nodemailer = require('nodemailer');
const user = require("../models/user");
const { json } = require("body-parser");
const EMAIL_SECRET = 'asdf1093KMnzxcvnkljvasdu09123nlasdasdf';

/**
 * Creating a new user
 * @param {*} user - new user object to be created 
 * @returns newly created user object
 */
exports.createUser = (user) => {
    const newUser = new User(user);
    return newUser.save();
}

/**
 * Add a new plan to owned plans field
 * @param {*} newlyAddedPlan - newly created plan 
 * @returns newly created user object
 */
exports.addOwnedPlan = (newlyAddedPlan) => {
    let userId = newlyAddedPlan.createdBy;
    // add plan to owned plan
    const user = User.findByIdAndUpdate(userId, {
        $addToSet: { ownedPlans: newlyAddedPlan._id },
        lastModifiedDate: Date.now()
    }, { new: true }).exec();
    return user;
}

/**
 * Get user by emailId
 * @param {*} emailId - user email id
 * @returns retrived user from mongodb
 */
exports.findUserById = async (userId) => {
    const user = await User.findById(userId)
        .populate("ownedPlans")
        .populate("memberPlans")
        .exec();
    return user;
}


/**
 * Add plan to member plan
 * Called when user is added as a member in a plan
 * @param {*} request 
 * @param {*} response 
 */
exports.addPlanToMemberPlanList = async (planId, userId) => {
    const user = User.findByIdAndUpdate(userId, {
        $addToSet: { memberPlans: planId },
        lastModifiedDate: Date.now()
    }, { new: true }).exec();
    return user;
}

/**
 * Remove plan from member plan in user
 * Called when user is added as a member in a plan
 * @param {*} request 
 * @param {*} response 
 */
exports.deleteMemberPlan = async (planId, userId) => {
    const user = User.findByIdAndUpdate(userId, {
        $pull: { memberPlans: planId },
        lastModifiedDate: Date.now()
    }, { new: true }).exec();
    return user;
}

/**
 * Get all users
 * @param {*} request 
 * @param {*} response 
 */
exports.getAllUsers = () => {
    return User.find().exec();
}

/**
 * Register user in system
 * @param {*} req 
 * @param {*} res 
 * @param {*} transporter 
 * @param {*} EMAIL_SECRET 
 */
exports.registerUser = (req, res, transporter, EMAIL_SECRET) => {

    User.register(
        new User({ username: req.body.username }),
        req.body.password,
        (err, user) => {
            if (err) {
                res.statusCode = 500;
                res.send(err);
            } else {
                user.firstName = req.body.firstName;
                user.lastName = req.body.lastName || "";
                const token = getToken({ _id: user._id });
                const refreshToken = getRefreshToken({ _id: user._id });
                user.refreshToken.push({ refreshToken });
                user.save((err) => {
                    if (err) {
                        res.statusCode = 500;
                        res.send(err);
                    } else {
                        let id = user._id;
                        jwt.sign({
                            user: _.pick(user, '_id'),
                        },
                            EMAIL_SECRET, {
                            expiresIn: '24h',
                        },
                            (err, emailToken) => {

                                if (err) {
                                    res.statusCode = 500;
                                    res.send(err);
                                } else {
                                    const url = `http://localhost:5000/confirmation/${emailToken}/${id}`;
                                    transporter.sendMail({
                                        to: user.username,
                                        subject: 'Confirm Email for Task Planner App',
                                        html: `Please click this email to confirm your email: <a href="${url}">${url}</a>`,
                                    });
                                }
                            },
                        );
                        // res.cookie("refreshToken", refreshToken, COOKIE_OPTIONS);
                        res.send({ success: true, token, "user": { "_id": user._id } });

                    }
                });
            }
        }
    );

}

/**
 * Validate credentials and login user
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.loginUser = (req, res, next) => {
    const token = getToken({ _id: req.user._id });
    const refreshToken = getRefreshToken({ _id: req.user._id });
    if (req.user.confirmed) {
        User.findById(req.user._id).then(
            (user) => {
                user.refreshToken.push({ refreshToken });
                user.save((err) => {
                    if (err) {
                        res.statusCode = 500;
                        res.send(err);
                    } else {
                        res.cookie("refreshToken", refreshToken, COOKIE_OPTIONS);
                        res.send({ success: true, token, "user": { "_id": user._id } });
                    }
                });
            },
            (err) => next(err)
        );
    } else {
        res.send({ success: false, message: "Please confirm your account by clicking the verification link on your Email" });
    }
};

/**
 * Refresh bearer token 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.refreshToken = (req, res, next) => {
    const { signedCookies = {} } = req
    const { refreshToken } = signedCookies

    if (refreshToken) {
        try {
            const payload = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET)
            const userId = payload._id
            User.findOne({ _id: userId }).then(
                user => {
                    if (user) {
                        // Find the refresh token against the user record in database
                        const tokenIndex = user.refreshToken.findIndex(
                            item => item.refreshToken === refreshToken
                        )

                        if (tokenIndex === -1) {
                            res.statusCode = 401
                            res.send("Unauthorized")
                        } else {
                            const token = getToken({ _id: userId })
                            // If the refresh token exists, then create new one and replace it.
                            const newRefreshToken = getRefreshToken({ _id: userId })
                            user.refreshToken[tokenIndex] = { refreshToken: newRefreshToken }
                            user.save((err, user) => {
                                if (err) {
                                    res.statusCode = 500
                                    res.send(err)
                                } else {
                                    res.cookie("refreshToken", newRefreshToken, COOKIE_OPTIONS)
                                    res.send({ success: true, token, "user": { "_id": user._id } })
                                }
                            })
                        }
                    } else {
                        res.statusCode = 401
                        res.send("Unauthorized")
                    }
                },
                err => next(err)
            )
        } catch (err) {
            res.statusCode = 401
            res.send("Unauthorized")
        }
    } else {
        res.statusCode = 401
        res.send("Unauthorized")
    }
}

/**
 * Logout user
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.logout = (req, res, next) => {
    const { signedCookies = {} } = req
    const { refreshToken } = signedCookies
    User.findById(req.user._id).then(
        user => {
            const tokenIndex = user.refreshToken.findIndex(
                item => item.refreshToken === refreshToken
            )

            if (tokenIndex !== -1) {
                user.refreshToken.id(user.refreshToken[tokenIndex]._id).remove()
            }

            user.save((err, user) => {
                if (err) {
                    res.statusCode = 500
                    res.send(err)
                } else {
                    res.clearCookie("refreshToken", COOKIE_OPTIONS)
                    res.send({ success: true })
                }
            })
        },
        err => next(err)
    )
}

/**
 * Send confirmation email to user
 * @param {*} req 
 * @param {*} res 
 * @param {*} EMAIL_SECRET 
 * @returns 
 */
exports.emailConfirmation = (req, res, EMAIL_SECRET) => {
    try {
        const userTemp = jwt.verify(req.params.token, EMAIL_SECRET);
        User.findByIdAndUpdate(userTemp.user._id, { "confirmed": true }).exec();
    } catch (e) {
        res.send('error');
    }

    return res.redirect('http://localhost:3000/');
}