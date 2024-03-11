const { Router } = require("express");

const routes = Router();

const userRoutes = require("./user.routes");
const dishRoutes = require("./dish.routes");
const sessionsRoutes = require("./sessions.routes");

routes.use("/users", userRoutes);
routes.use("/dishes", dishRoutes);
routes.use("/sessions", sessionsRoutes);

module.exports = routes;    