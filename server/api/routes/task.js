const express = require("express");
const taskController = require("../controllers/task");
const { verifyUser } = require('../../authenticate');

const taskRouter = express.Router();

taskRouter.route('/')
    .post(verifyUser, taskController.createTask) // creating a new task object

taskRouter.route('/:taskId') 
    .get(verifyUser, taskController.getTask) // get task by id
    .put(verifyUser, taskController.updateTask) // update an existing task
    .delete(verifyUser,taskController.deleteTask) // delete an existing task

module.exports = taskRouter;