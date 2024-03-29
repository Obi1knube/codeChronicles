
const router = require("express").Router();
const apiRoutes = require("./api");
const homeRoutes = require("./homeRoutes");

// Use the homeRoutes for the root path "/"
router.use("/", homeRoutes);

// Use the apiRoutes for the "/api" path
router.use("/api", apiRoutes);

// Export the router
module.exports = router;

