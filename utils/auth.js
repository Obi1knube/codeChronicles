// This middleware function checks if the user is authenticated
const withAuth = (req, res, next) => {
  // If the user is not logged in, redirect the request to the login route
  if (!req.session.logged_in) {
    res.redirect("/login");
  } else {
    // If the user is logged in, proceed to the next middleware or route handler
    next();
  }
};

// Export the withAuth middleware function
module.exports = withAuth;

// This code defines a middleware function called withAuth. It takes in the req, res, and next parameters,
//  which are the request, response, and next middleware function in the stack, respectively.

// The purpose of this middleware function is to check if the user is authenticated.
//  It does this by checking if the logged_in property exists in the req.session object.
//  If it does not exist or is falsy, meaning the user is not logged in, the function redirects the request to the /login route.
//  This ensures that only authenticated users can access the routes that use this middleware.

// If the user is logged in, the function calls the next function,
//  allowing the request to proceed to the next middleware or route handler in the stack.

// Finally, the withAuth middleware function is exported so that it can be used in other parts of the application.
