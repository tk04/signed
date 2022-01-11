const express = require("express");
const User = require("../models/user");
const auth = require("../middleware/auth");
const sharp = require("sharp");
const multer = require("multer");
const jwt = require("jsonwebtoken");
const router = new express.Router();
const cors = require("cors");

const upload = multer({
  limits: {
    fileSize: 1000000, // in MB
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png|JPG|JPEG|PNG)$/)) {
      return cb(new Error("Please upload a .png, .jpeg, or .jpg image"));
    }
    cb(undefined, true);
  },
});
router.post("/api1/users/signup", async (req, res) => {
  const user = new User(req.body);
  try {
    await user.save();
    const token = user.generateAuthToken();
    res.status(201).send({ user, token });
  } catch (e) {
    res.status(404).send(e);
  }
});

router.post("/api1/users/login", async (req, res) => {
  try {
    const user = await User.Login(req.body.email, req.body.password);
    const token = await user.generateAuthToken();
    res.status(200).send({ user, token });
  } catch (e) {
    res.status(404).send({ error: "Could not login" });
  }
});

router.get("/api1/users/me", cors(), async (req, res) => {
  try {
    const token = req.headers.authorization.replace("Bearer ", "");
    // // const token = req.header("Authorization").replace("Bearer ", "");
    const decoded = jwt.verify(token, "testing123123_fzxasszxc");
    const user = await User.findOne({ _id: decoded._id });
    if (!user) {
      throw new Error();
    }
    res.send({ user });
  } catch (e) {
    res.status(401).send({ error: "Please authenticate" });
  }
});

router.get("/api1/users/:username", async (req, res) => {
  try {
    const token = req.headers.authorization
      ? req.headers.authorization.replace("Bearer ", "")
      : null;

    const uid = req.params.username;
    const user = await User.findOne({ username: uid });
    if (!user) {
      return res.status(404).send({ error: "User not found" });
    }
    const decoded = jwt.verify(token, "testing123123_fzxasszxc");
    if (decoded._id === user._id.toString()) {
      return res.send({ isUser: true, user });
    }
    res.send({ user });
  } catch (e) {
    res.send({ error: "An error occurred, try again later" });
  }
});

router.patch("/api1/users/me", auth, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = [
    "name",
    "username",
    "email",
    "password",
    "bio",
    "accomplishments",
    "keywords",
    "socials",
  ];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );
  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid updates!" });
  }
  try {
    updates.forEach((update) => (req.user[update] = req.body[update]));
    await req.user.save();

    res.send(req.user);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.post(
  "/api1/users/me/avatar",
  auth,
  upload.single("avatar"),
  async (req, res) => {
    const buffer = await sharp(req.file.buffer)
      .resize({ width: 250, height: 250 })
      .png()
      .toBuffer();
    req.user.avatar = buffer; // multer addes file to req obj if destination not specified in config
    await req.user.save();
    res.send();
  },
  (err, req, res, next) => {
    // function to run when err happens
    res.status(400).send({ error: err.message });
  }
);

router.get("/api1/users/me/username", auth, async (req, res) => {
  res.send({ username: req.user.username });
});
module.exports = router;
