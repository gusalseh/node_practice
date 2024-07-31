const express = require("express");
const User = require("../models");
const Comment = require("../models");

const router = express.Router();

router.route("/").get(async (req, res, next) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (err) {}
});
