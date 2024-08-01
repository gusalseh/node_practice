const express = require("express");
const router = express.Router();
const { renderJoin } = require("../controllers/auth");

router.get("/join", renderJoin);

module.exports = router;
