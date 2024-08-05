const express = require("express");
const router = express.Router();

const page = require("./page.js");
const community = require("./community.js");
const auth = require("./auth.js");
const mypage = require("./mypage.js");

router.use("/", page);
router.use("/community", community);
router.use("/auth", auth);
router.use("/mypage", mypage);

module.exports = router;
