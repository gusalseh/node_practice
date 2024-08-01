const express = require("express");
const router = express.Router();
const { renderProfile } = require("../controllers/mypage");

router.get("/profile", renderProfile);

module.exports = router;
