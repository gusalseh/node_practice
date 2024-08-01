const express = require("express");
const router = express.Router();
const { renderProfile } = require("../controllers/page");

router.get("/profile", renderProfile);

module.exports = router;
