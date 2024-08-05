const express = require("express");
const {
  renderMain,
  renderHashtag,
  renderJoin,
} = require("../controllers/page");
const { isLoggedIn, isNotLoggedIn } = require("../middlewares");
const { renderProfile } = require("../controllers/mypage");

const router = express.Router();

router.use((req, res, next) => {
  res.locals.user = req.user;
  res.locals.followerCount = req.user?.Followers?.length || 0;
  res.locals.followingCount = req.user?.Followings?.length || 0;
  res.locals.followingIdList = req.user?.Followings?.map((f) => f.id) || [];
  next();
});

router.get("/profile", isLoggedIn, renderProfile);

router.get("/join", isNotLoggedIn, renderJoin);

router.get("/", renderMain);

router.get("/hashtag", renderHashtag);

module.exports = router;
