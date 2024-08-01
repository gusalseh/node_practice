const express = require("express");
const router = express.Router();
const { join } = require("../controllers/auth");
const { isLoggedIn, isNotLoggedIn } = require("../middlewares");

router.get("/join", isNotLoggedIn, join);

router.get("/login", isNotLoggedIn, login);

router.get("/logout", isLoggedIn, logout);

module.exports = router;
