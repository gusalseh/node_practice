const express = require("express");
const router = express.Router();
const { renderMain } = require("../controllers/page");

router.use((req, res, next) => {
  res.locals.followerCount = 0;
  res.locals.followingCount = 0;
  res.locals.followingIdList = [];
  next();
});

router.get("/", renderMain);

module.exports = router;
