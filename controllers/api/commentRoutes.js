const router = require("express").Router();
const { Comment } = require("../../models");
const withAuth = require("../../utils/auth");

// Get all comments
router.get("/", async (req, res) => {
  try {
    const comments = await Comment.findAll();
    res.json(comments);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Post a new comment
router.post("/", withAuth, async (req, res) => {
  try {
    const comment = await Comment.create({
      ...req.body,
      blog_id: req.body.blog_id,
      user_id: req.session.user_id,
    });
    res.status(201).json(comment);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Delete a comment
router.delete("/:id", async (req, res) => {
  try {
    const comment = await Comment.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (comment === 0) {
      res.status(404).json({ message: "No comment found with this id" });
    } else {
      res.json({ message: "Comment deleted successfully" });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
