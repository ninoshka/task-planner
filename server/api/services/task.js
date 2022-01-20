const Task = require("../models/task");

/**
 * Creating a new task
 * @param {*} task - new task object to be created 
 * @returns newly created task object
 */
exports.createTask = (task) => {
    const newTask = new Task(task);
    return newTask.save();
}

/**
 * Update an existing task
 * @param {*} taskId unique id of task
 * @param {*} task - task object containing upadted task fields 
 * @returns newly created task object
 */
exports.updateTask = (taskId, taskObj) => {
    // update last modified date
    taskObj.lastModifiedDate = Date.now();
    const updatedTaskPromise = Task.findByIdAndUpdate(taskId, taskObj, { new: true }).exec();
    return updatedTaskPromise;
}

/**
 * Delete an existing task
 * @param {*} taskId of task
 * @returns newly created task object
 */
exports.deleteTask = (taskId) => {
    console.log(taskId);
    const deleteTaskPromise = Task.deleteOne({"_id":taskId}).exec();
    return deleteTaskPromise;
}

/**
 * Delete an existing task
 * @param {*} taskId of task
 * @returns newly created task object
 */
 exports.getTask = (taskId) => {
    const taskPromise = Task.findById(taskId).exec();
    return taskPromise;
}


/**
 * Get all tasks for a plan
 * @param {*} planId
 * @returns list of tasks
 */
exports.getAllTasksInPlan = (planId) => {
    console.log(planId);
    const taskPromise = Task.find({ "plan": planId }).populate("assignedTo").exec();
    return taskPromise;
}