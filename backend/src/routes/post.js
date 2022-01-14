const Post = require("../models/post");
const express = require("express");
const auth = require("../middleware/auth");

const router = express.Router();

router.post("/api1/posts", auth, async (req, res) => {
  console.log(req.body);
  const post = new Post({
    ...req.body,
    owner: req.user.username,
  });
  try {
    await post.save();
    res.status(201).send(post);
  } catch (e) {
    res.status(400).send({
      error: e.message,
    });
  }
});
router.get("/api/posts/:id", auth, async (req, res) => {
  const post = await Post.findOne({ _id: req.params.id });
  if (!post) {
    return res.status(404).send();
  }
  res.send(post);
});

router.get("/api1/posts/:uid", async (req, res) => {
  try {
    const posts = await Post.find({ owner: req.params.uid });
    if (!posts) {
      throw new Error("user not found");
    }
    res.send(posts);
  } catch (e) {
    res.status(404).send();
  }
});

module.exports = router;
