const { User, Post, Hashtag } = require("../models");

exports.renderProfile = (req, res) => {
  res.render("profile", { title: "내 정보 - NodeBird" });
};

exports.renderJoin = (req, res) => {
  res.render("join", { title: "회원가입 - NodeBird" });
};

exports.renderMain = async (req, res, next) => {
  // pagination 구현부
  let pageSize = 10;
  let currentPage = req.params.currentPage; // 추후 프론트단에서 구체화

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

  let offset = (currentPage - 1) * pageSize;

  try {
    const posts = await Post.findAll({
      include: {
        model: User,
        attributes: ["id", "nick"],
      },
      // 해당 부분에 offset, limit 추가
      offest: Number(offset) || 0,
      limit: 10,
      order: [["createdAt", "DESC"]],
    });
    res.render("main", {
      title: "NodeBird",
      twits: posts,
      // 프론트로 넘겨줘야할 부분
      totalSize: totalSize,
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
