// Import the necessary dependencies
const router = require("express").Router();
const apiRoutes = require("./api");
const homeRoutes = require("./homeRoutes");

// Use the homeRoutes for the root path "/"
router.use("/", homeRoutes);

// Use the apiRoutes for the "/api" path
router.use("/api", apiRoutes);

// Export the router
module.exports = router;

// In this file, we are creating an Express router and setting up the routes for our application.

// The require("express").Router() method is used to create a new router object.

// We import the apiRoutes and homeRoutes modules from their respective files.

// The router.use() method is used to define the routes for our application.
// We use the homeRoutes for the root path "/" and the apiRoutes for the "/api" path.

// Finally, we export the router object to make it available for other parts of our application to use.
