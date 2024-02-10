// Import necessary modules and models
const router = require('express').Router();
const { Comment, Blog, User } = require('../models');
const withAuth = require('../utils/auth');

// Route to get all blog posts and render the homepage template
router.get('/', withAuth, async (req, res) => {
  try {
    // GET all blog posts and JOIN with userData
    const blogData = await Blog.findAll({
      include: [
        {
          model: User,
          attributes: ['name'],
          include: {
            model: Comment,
            attributes: ['description'],
          },
        },
      ],
    });

    // Serialize data so the template can read it
    const blogs = blogData.map((blog) => blog.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render('homepage', {
      blogs,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Route to get a specific blog by id and render the blog template
router.get('/blog/:id', withAuth, async (req, res) => {
  try {
    const blogData = await Blog.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['name'],
          include: {
            model: Comment,
            attributes: ['content'],
          },
        },
      ],
    });

    if (!blogData) {
      res.status(404).json({ message: 'No blog found with this id' });
      return;
    }

    const blog = blogData.get({ plain: true });

    res.render('blog', {
      blog,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Route to get the user's profile and render the profile template
router.get('/profile', withAuth, async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Blog }],
    });

    const user = userData.get({ plain: true });

    res.render('profile', {
      ...user,
      logged_in: true,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Route to render the login template
router.get('/login', (req, res) => {
  //If the user is already logged in, redirect the request to qnother route
  if (req.session.logged_in) {
    res.redirect('/profile');
    return;
  }

  res.render('login');
});

module.exports = router;
