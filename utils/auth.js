  const withAuth = (req, res, next) => {
    // If the user is not logged in, redirect the request to the login route
    if (!req.isAuthenticated()) {
      res.redirect('/login');
    } else {
      // If the user is logged in, proceed to the next middleware function
      next();
    }
  };
  
  module.exports = withAuth;