const Sequelize = require("sequelize");

class User extends Sequelize.Model {
  static initiate(sequelize) {
    User.init(
      {
        email: {
          type: Sequelize.STRING(40),
          allowNull: true,
          unique: true,
        },
        nick: {
          type: Sequelize.STRING(15),
          // allowNull: false,
        },
        password: {
          type: Sequelize.STRING(100),
          allowNull: true,
        },
        name: {
          type: Sequelize.STRING(20),
          // allowNull: false,
          unique: true,
        },
        provider: {
          type: Sequelize.STRING(255),
          allowNull: false,
        },
        snsId: {
          type: Sequelize.STRING(255),
        },
        age: {
          type: Sequelize.INTEGER.UNSIGNED,
          // allowNull: false,
        },
        married: {
          type: Sequelize.BOOLEAN,
          // allowNull: false,
        },
        comment: {
          type: Sequelize.TEXT,
          allowNul: false,
        },
      },
      {
        sequelize,
        timestamps: true,
        modelName: "User",
        tableName: "users",
        paranoid: true,
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }
  static associate(db) {
    db.User.hasMany(db.Comment, { foreignKey: "commenter", sourceKey: "id" });
  }
}

module.exports = User;
