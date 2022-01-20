const planService = require('../services/plan');
const userService = require('../services/user');
const taskService = require('../services/task');
const util = require('../utils/controller.utility');

/**
 * Creating a new user in the system
 * @param {*} request 
 * @param {*} response 
 */
exports.createUser = async(request, response) => {
    try {
        const user = {...request.body };
        const newUserObj = await userService.createUser(user);
        util.setResponse(newUserObj, response);
    } catch (e) {
        util.errorHandler(e.message, response);
    }
}

/**
 * Retriver user object by email id
 * @param {*} request 
 * @param {*} response 
 */
 exports.getUserById = async (request, response) => {
    try {
        const userId = request.params.id;
        const userObj = await userService.findUserById(userId);
        util.setResponse(userObj, response);
    } catch (e) {
        util.errorHandler(e.message, response);
    }
}

/**
 * Retriver user object by email id
 * @param {*} request 
 * @param {*} response 
 */
 exports.getAllUsers = async (request, response) => {
    try {
        const users = await userService.getAllUsers();
        util.setResponse(users, response);
    } catch (e) {
        util.errorHandler(e.message, response);
    }
}