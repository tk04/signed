const express = require("express");
const User = require("../models/user");
const auth = require("../middleware/auth");
const router = new express.Router();

router.post("/users/signup", async (req, res) => {
  const user = new User(req.body);
  try {
    await user.save();
    const token = user.generateAuthToken();
    res.status(201).send({ user, token });
  } catch (e) {
    res.status(404).send(e);
  }
});

router.post("/users/login", async (req, res) => {
  try {
    const user = await User.Login(req.body.email, req.body.password);
    const token = await user.generateAuthToken();
    res.status(200).send({ user, token });
  } catch (e) {
    res.status(404).send({ error: "Could not login" });
  }
});

router.get("/users/me", auth, async (req, res) => {
  const { email, name, username, birth_date } = req.user;
  res.send({ email, name, username, birth_date });
});

module.exports = router;
