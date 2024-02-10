// Import the necessary dependencies
const sequelize = require('../config/connection');
const { User, Blog, Comment } = require('../models');

const userData = require('./userData.json');
const blogData = require('./blogData.json');
const commentData = require('./commentData.json');

// Define the seedDatabase function
const seedDatabase = async () => {
  // Sync the models with the database and force it to drop and recreate the tables
  await sequelize.sync({ force: true });

  // Bulk create the users with individual hooks enabled
  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  // // Loop through the blog data and create blogs for each user
  // for (const blog of blogData) {
  //   // Create a blog with the data from the blogData.json file
  //   const createdBlog = Blog.create({
  //     ...blog,
  //     // Set the user_id to a random user's id
  //       user_id: users[Math.floor(Math.random() * users.length)].id,
  //   });
  //   //Loop through the comments and create comment for each blog
  //   for (const comment of commentData) {
  //     await Comment.create({
  //       ...comment,
  //       //Set the user_id and blog_id to the corresponding ids
  //       user_id: users[Math.floor(Math.random() * userData.length)].id,
  //       blog_id: createdBlog.id,
  //     });
  //   }
  // }

  // Exit the process
  process.exit(0);
};

// Call the seedDatabase function
seedDatabase();
