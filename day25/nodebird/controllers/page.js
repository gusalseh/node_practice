const { User, Post, Hashtag } = require("../models");

exports.renderProfile = (req, res) => {
  res.render("profile", { title: "내 정보 - NodeBird" });
};

exports.renderJoin = (req, res) => {
  res.render("join", { title: "회원가입 - NodeBird" });
};

exports.renderMain = async (req, res, next) => {
  // pagination 구현부

  // 데이터베이스 쿼리해서 계산 필요
  let totalSize = 0;

  try {
    const posts = await Post.findAll({
      include: {
        model: User,
        attributes: ["id", "nick"],
      },
    });
    totalSize = posts.length;
  } catch (err) {
    console.error(err);
    next(err);
  }

  // try {
  //   const { count } = await Post.findAndCountAll({});
  //   totalSize = count;
  // } catch (err) {
  //   console.error(err);
  // }

  let pageSize = 5;

  // http://localhost:8001/?currentPage=1의 역할
  let currentPage = 0;
  if (req.query.currentPage) currentPage = Number(req.query.currentPage);
  if (currentPage == 0) currentPage = 1;
  console.log("currentPage", currentPage);

  let offset = (currentPage - 1) * pageSize;
  console.log("offset: ", offset);
  let pageOffset = Math.floor((currentPage - 1) / 10) * 10 + 1;
  console.log("pageOffset", pageOffset);
  console.log("totalSize: ", totalSize);
  let maxPage = Math.floor(totalSize / pageSize) + 1;
  console.log("maxPage: ", maxPage);
  try {
    const posts = await Post.findAll({
      include: {
        model: User,
        attributes: ["id", "nick"],
      },
      // 해당 부분에 offset, limit 추가
      offset: Number(offset) || 0,
      limit: 5,
      order: [["createdAt", "DESC"]],
    });
    res.render("main", {
      title: "NodeBird",
      twits: posts,
      // 프론트로 넘겨줘야할 부분
      totalSize: totalSize,
      currentPage: currentPage,
      pageSize: pageSize,
      pageOffset: pageOffset,
      maxPage: maxPage,
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
};

exports.renderHashtag = async (req, res, next) => {
  const query = req.query.hashtag;
  if (!query) {
    return res.redirect("/");
  }
  try {
    const hashtag = await Hashtag.findOne({ where: { title: query } });
    let posts = [];
    if (hashtag) {
      posts = await hashtag.getPosts({ include: [{ model: User }] });
    }

    return res.render("main", {
      title: `${query} | NodeBird`,
      twits: posts,
    });
  } catch (error) {
    console.error(error);
    return next(error);
  }
};
