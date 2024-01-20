// Import necessary modules and models
const router = require("express").Router();
const { Blog, User } = require("../models");
const withAuth = require("../utils/auth");

// Route to get the homepage
router.get("/", async (req, res) => {
  try {
    // Get all blogs and join with user data
    const blogData = await Blog.findAll({
      include: [
        {
          model: User,
          attributes: ["name"],
        },
      ],
    });

    // Serialize data so the template can read it
    const blogs = blogData.map((blog) => blog.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render("homepage", {
      blogs,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Route to get a specific blog
router.get("/blog/:id", async (req, res) => {
  try {
    const blogData = await Blog.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ["name"],
        },
      ],
    });

    const blog = blogData.get({ plain: true });

    res.render("blog", {
      ...blog,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Route to get the user's profile
// Use withAuth middleware to prevent access to route
router.get("/profile", withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ["password"] },
      include: [{ model: Blog }],
    });

    const user = userData.get({ plain: true });

    res.render("profile", {
      ...user,
      logged_in: true,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Route to get the login page
router.get("/login", (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect("/profile");
    return;
  }

  res.render("login");
});

module.exports = router;

// This file defines the routes for the homepage, specific blog, user profile, and login page.

// The / route is a GET route that retrieves all blogs and joins them with user data.
// The serialized data is passed to the homepage template along with the session flag indicating if the user is logged in.

// The /blog/:id route is a GET route that retrieves a specific blog and its associated user data.
// The serialized data is passed to the blog template along with the session flag indicating if the user is logged in.

// The /profile route is a GET route that retrieves the logged-in user's data based on the session ID. The user's data,
// excluding the password, is passed to the profile template along with the session flag indicating that the user is logged in.
// This route uses the withAuth middleware to prevent access to the route if the user is not authenticated.

// The /login route is a GET route that renders the login template. If the user is already logged in, t
// he request is redirected to the /profile route.

// The module.exports statement exports the router object for use in other files.
