const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Blog extends Model {}

Blog.init(
  {
    // Define the id column
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    // Define the title column
    title: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    // Define the content column
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    // Define the user_id column
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "user",
        key: "id",
      },
    },
  },
  {
    // Pass the sequelize instance
    sequelize,
    // Disable timestamps
    timestamps: false,
    // Set the table name to 'comment'
    freezeTableName: true,
    // Use underscores instead of camel case for column names
    underscored: true,
    // Set the model name to 'comment'
    modelName: "blog",
  }
);

module.exports = Blog;
