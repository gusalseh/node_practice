const Sequelize = require("sequelize");

class Comment extends Sequelize.Model {
  static initiate(sequelize) {
    Comment.init(
      {
        comment: {
          type: Sequelize.STRING(100),
          allowNull: false,
        },
        created_at: {
          type: Sequelize.DATE,
          allowNull: true,
          defaultValue: Sequelize.NOW,
        },
      },
      {
        sequelize,
        timestamps: false,
        modelName: "Comment",
        tableName: "comments",
        paranoid: false,
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci",
      }
    );
  }

  static associate(db) {
    // 반대의 입장에서는 belongsTo로 표현 (댓글.belongsTo(사용자))
    // belongsTo가 있는 테이블에 컬럼이 생김 (댓글 테이블에 commenter 컬럼)
    db.Comment.delongsTo(db.User, { foreignKey: "commenter", targetKey: "id" });
  }
}

module.exports = Comment;
