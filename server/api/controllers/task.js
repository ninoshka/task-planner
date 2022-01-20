const planService = require('../services/plan');
const taskService = require('../services/task.js');
const util = require('../utils/controller.utility.js');

/**
 * Creating a new task in the system
 * @param {*} request 
 * @param {*} response 
 */
exports.createTask = async (request, response) => {
    try {
        const task = { ...request.body };
        // create new task
        const newTaskObj = await taskService.createTask(task);
        // add task in plan object
        await planService.addTaskToPlan(newTaskObj);
        util.setResponse(newTaskObj, response);
    } catch (e) {
        util.errorHandler(e.message, response);
    }
}

/**
 * Update a task by id
 * @param {*} request 
 * @param {*} response 
 */
exports.updateTask = async (request, response) => {
    try {
        const updatedTask = request.body;
        const taskId = request.params.taskId;
        const taskObj = await taskService.updateTask(taskId, updatedTask);
        util.setResponse(taskObj, response);
    } catch (e) {
        util.errorHandler(e.message, response);
    }
}

/**
 * Get a task by id
 * @param {*} request 
 * @param {*} response 
 */
exports.getTask = async (request, response) => {
    try {
        const taskId = request.params.taskId;
        const taskObj = await taskService.getTask(taskId);
        util.setResponse(taskObj, response);
    } catch (e) {
        util.errorHandler(e.message, response);
    }
}

/**
 * Delete a task by id
 * @param {*} request 
 * @param {*} response 
 */
exports.deleteTask = async (request, response) => {
    try {
        const taskId = request.params.taskId;
        const planId = request.body.planId;
        const taskObj = await taskService.deleteTask(taskId);
        const planObj = await planService.deleteTaskFromPlan(planId, taskId);
        util.setResponse(planObj, response);
    } catch (e) {
        util.errorHandler(e.message, response);
    }
}