const express = require("express");
const path = require("path");
const morgan = require("morgan");
const nunjucks = require("nunjucks");

const { sequelize } = require("./models");
const { User } = require("./models");
const { Op } = require("sequelize");

const app = express();
app.set("port", process.env.PORT || 3001);
app.set("view engine", "html");
nunjucks.configure("views", {
  express: app,
  watch: true,
});
sequelize
  .sync({ force: false })
  .then(() => {
    console.log("데이터 베이스 연결 성공");
  })
  .catch((err) => {
    console.log(err);
  });

app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  const error = new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
  error.status = 404;
  next(error);
});

app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = process.env.NODE_ENV !== "production" ? err : {};
  res.status(err.status || 500);
  res.render("error");
});

app.listen(app.get("port"), async () => {
  console.log(app.get("port"), "번 포트에서 대기 중");

  // 읽기
  // let data = await User.findAll({
  //   attribute: ["name", "married"],
  //   where: {
  //     married: 1,
  //     age: { [Op.gt]: 30 },
  //   },
  // });

  // 읽기
  // let data = await User.findAll({
  //   attributes: ["id", "name"],
  //   order: [["age", "DESC"]],
  //   limit: 1,
  //   offset: 1,
  // });

  // 수정
  // let data = await User.update(
  //   {
  //     comment: "update로 수정한 내용",
  //   },
  //   {
  //     where: { id: 2 },
  //   }
  // );

  // 삭제
  // let data = await User.destroy({
  //   where: { id: 2 },
  // });

  console.log(data);
});
