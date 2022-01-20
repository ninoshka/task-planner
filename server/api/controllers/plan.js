const planService = require('../services/plan');
const userService = require('../services/user');
const taskService = require('../services/task');
const util = require('../utils/controller.utility');

/**
 * Creating a new plan in the system
 * @param {*} request 
 * @param {*} response 
 */
 exports.createPlan = async (request, response) => {
    try {
        const plan = { ...request.body };
        // create new plan
        const newPlanObj = await planService.createPlan(plan);
        // add plan to owned plans array in user object
        await userService.addOwnedPlan(newPlanObj);
        util.setResponse(newPlanObj, response);
    } catch (e) {
        util.errorHandler(e.message, response);
    }
}

/**
 * Retriving plan by id
 * @param {*} request 
 * @param {*} response 
 */
 exports.getPlanById = async (request, response) => {
    try {
        const planId = request.params.planId;
        const plan = await planService.getPlanById(planId)
        const tempVar = {};
        if (plan === null) {
            util.setResponse({tempVar}, response);
        } else {
            util.setResponse(plan, response);    
        }
    } catch (e) {
        util.errorHandler(e.message, response);
    }
}

/**
 * Retriving all plans in the system
 * @param {*} request 
 * @param {*} response 
 */
 exports.getPlans = async (request, response) => {
    try {
        const planArray = await planService.getPlans();
        util.setResponse(planArray, response);
    } catch (e) {
        util.errorHandler(e.message, response);
    }
}

/**
 * Add member to existing plan
 * Used while adding new members to the plan
 * @param {*} request 
 * @param {*} response 
 */
exports.addMemberToPlan = async (request, response) => {
    try {
        const planId = request.params.planId;
        const memberId = request.params.memberId;
        const plan = await planService.addMemberToPlan(planId, memberId);
        const user = await userService.addPlanToMemberPlanList(planId, memberId)
        util.setResponse(plan, response);
    } catch (e) {
        util.errorHandler(e.message, response);
    }
}

/**
 * Delete member from plan
 * Used while adding new members to the plan
 * @param {*} request 
 * @param {*} response 
 */
 exports.deleteMemberFromPlan = async (request, response) => {
    try {
        const planId = request.params.planId;
        const memberId = request.params.memberId;
        const plan = await planService.deleteMemberFromPlan(planId, memberId);
        const user = await userService.deleteMemberPlan(planId, memberId)
        util.setResponse(plan, response);
    } catch (e) {
        util.errorHandler(e.message, response);
    }
}

/**
 * Get all tasks in a plan
 * 
 * @param {*} request 
 * @param {*} response 
 */
 exports.getAllTaskInPlan = async (request, response) => {
    try {
        const planId = request.params.planId;
        const tasks = await taskService.getAllTasksInPlan(planId);
        util.setResponse(tasks, response);
    } catch (e) {
        util.errorHandler(e.message, response);
    }
}

