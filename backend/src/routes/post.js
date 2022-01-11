const Post = require("../models/post");
const express = require("express");
const auth = require("../middleware/auth");

const router = express.Router();

router.post("/api/posts", auth, async (req, res) => {
  const post = new Post({
    ...req.body,
    owner: req.user._id,
  });
  try {
    await post.save();
    res.status(201).send(post);
  } catch (e) {
    res.status(400).send({
      error: "an error happened while saving the post, try again later.",
    });
  }
});
