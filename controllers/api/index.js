// Import the necessary modules
const router = require("express").Router();
const userRoutes = require("./userRoutes");
const blogRoutes = require("./blogRoutes");

// Use the userRoutes for requests with "/users" route
router.use("/users", userRoutes);

// Use the blogRoutes for requests with "/blogs" route
router.use("/blogs", blogRoutes);

// Export the router
module.exports = router;

// In this code, we are creating an Express router object and
// importing the userRoutes and blogRoutes modules.
//  We then use the use method to specify that any requests with a route
//  starting with "/users" should be handled by the userRoutes module,
// and any requests with a route starting with "/blogss" should be handled by the blogRoutes module.
//  Finally, we export the router object so that it can be used in other parts of the application.
