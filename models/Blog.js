const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Blog extends Model {}

// Initialize the Blog model
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
      type: DataTypes.STRING,
      allowNull: false,
    },
    // Define the content column
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    // Define the author_id column
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "user",
        key: "id",
      },
    },

    // Define the created_at column
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    // Define the updated_at column
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    // Pass the sequelize instance
    sequelize,
    // Disable timestamps
    timestamps: false,
    // Set the table name to 'blog'
    freezeTableName: true,
    // Use underscores instead of camel case for column names
    underscored: true,
    // Set the model name to 'blog'
    modelName: "blog",
  }
);

module.exports = Blog;
