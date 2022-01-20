const express = require("express");
const planController = require("../controllers/plan");
const { verifyUser } = require('../../authenticate');

const planRouter = express.Router();

planRouter.route('/')
    .get(verifyUser,planController.getPlans) //retriving all plans inside the system
    .post(verifyUser,planController.createPlan) // creating a new plan object

planRouter.route('/:planId')
    .get(verifyUser,planController.getPlanById) //retrive plan by id

planRouter.route('/:planId/member/:memberId')
    .put(verifyUser,planController.addMemberToPlan) //add member to plan
    .delete(verifyUser,planController.deleteMemberFromPlan) //delete member from plan

module.exports = planRouter;