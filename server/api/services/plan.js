const { Plan } = require("../models/plan");

/**
 * Creating a new plan
 * @param {*} plan - new plan object to be created 
 * @returns newly created plan object
 */
exports.createPlan = (plan) => {
    const newPlan = new Plan(plan);    
    // adding owner as a member in a plan
    newPlan.members.push(newPlan.createdBy);
    return newPlan.save();
}

/**
 * Retrive all plans
 * @returns array of plans
 */
exports.getPlans = () => {
     // populate joins user object in createdBy field
     const plansPromise = Plan.find();
     return plansPromise;
}

/**
 * Retrive plan by id
 * @returns array of plans
 */
exports.getPlanById = (planId) => {
     const searchPlan = {
         "_id": planId 
     };
    // populate task, member, owner object in createdBy field
    const planPromise = Plan.findOne(searchPlan)
    .populate("tasks")
    .populate("members")
    .exec();

    return planPromise;
}

/**
 * Add a task to plan 
 * @param {*} newTaskObj- newly created task 
 * @returns plan object linked with tasks
 */
exports.addTaskToPlan = async (newTaskObj) => {
     // adding task object to plan
     const plan = await Plan.findByIdAndUpdate(newTaskObj.plan, {$addToSet: {tasks: newTaskObj._id}, 
        lastModifiedDate: Date.now()}, {new: true}).exec()
     return await plan.save();
}

/**
 * Add member to existing plan
 * @param {*} planId plan id
 * @param {*} memberId member id
 * @returns 
 */
exports.addMemberToPlan = (planId, memberId) => {
    // addToSet member - only add if not already present in array
    // prevents duplication of members
    const plan = Plan.findByIdAndUpdate(planId, {$addToSet: {members: memberId}, 
        lastModifiedDate: Date.now()}, {new: true}).exec();
    return plan;
}

/**
 * Delete member from existing plan
 * @param {*} planId plan id
 * @param {*} memberId member id
 * @returns 
 */
 exports.deleteMemberFromPlan = (planId, memberId) => {
    const plan = Plan.findByIdAndUpdate(planId, {$pull: {members: memberId}, 
        lastModifiedDate: Date.now()}, {new: true}).exec();
    return plan;
}

/**
 * Update last modified date in plan
 * @param {*} planId plan id
 * @returns 
 */
exports.updateLastModifiedDate = (planId) => {
    const plan = Plan.findByIdAndUpdate(planId, { lastModifiedDate: Date.now()}, {new: true}).exec();
    return plan;
}

/**
 * Delete task from plan
 * @param {*} planId plan id
 * @returns 
 */
 exports.deleteTaskFromPlan = (planId, taskId) => {
    console.log(planId);
    const plan = Plan.findByIdAndUpdate(planId, {$pull: {tasks: taskId}, 
        lastModifiedDate: Date.now()}, {new: true}).exec();
    return plan;
}
