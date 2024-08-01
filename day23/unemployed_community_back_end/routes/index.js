const express = require("express");
const router = express.Router();

const page = require("./page.js");
const community = require("./community.js");
// routes/auth.js 적용
const auth = require("./auth.js");
// routes/mypage.js 적용
const mypage = require("./mypage.js");

router.use("/", page);
router.use("/community", community);
// localhost:8001/auth/join
router.use("/auth", auth);
// localhost:8001/mypage/profile
router.use("/mypage", mypage);

module.exports = router;
