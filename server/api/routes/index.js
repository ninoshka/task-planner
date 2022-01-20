const planRouter = require("./plan");
const taskRouter = require("./task");
const userRouter = require("./user");
const authenticationRouter = require("./authentication");

/**
 * Base routes for different app components
 * @param {*} app 
 */
const routes = (app) => {
    app.use("/", authenticationRouter);
    app.use("/plans", planRouter);
    app.use("/tasks", taskRouter);
    app.use("/users", userRouter);
}

module.exports = routes;