// a util file that will contain all common methods for controllers

/**
 * Handling error and setting response in response object for error transactions
 * @param {*} message 
 * @param {*} response 
 */
exports.errorHandler = (message, response) => {
    response.status(500);
    response.json({ error: message });
}

/**
 * Set 200 Ok status and response in response object for success transactions
 * @param {*} response 
 */
exports.setResponse = (data, response) => {
        response.status(200);
        response.json(data);
    }
    // const util = 
    // module.exports = util;