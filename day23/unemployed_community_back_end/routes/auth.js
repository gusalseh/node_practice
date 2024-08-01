const express = require("express");
const router = express.Router();
const { renderJoin } = require("../controllers/page");

router.get("/join", renderJoin);

module.exports = router;
