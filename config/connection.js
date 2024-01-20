// Import sequelize package
const Sequelize = require('sequelize');

// Load environmental variables from the .env file
require('dotenv').config();

// Create sequelize instance
let sequelize;

// Check if the JAWSDB_URL environment variable is set (indicating a deployment on Heroku)
if (process.env.JAWSDB_URL) {
  // If JAWSDB_URL is set, create a Sequelize instance using the provided URL
  sequelize = new Sequelize(process.env.JAWSDB_URL);
} else {
  // If JAWSDB_URL is not set, create a Sequelize instance using the local database configuration
  sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
      host: 'localhost',
      dialect: 'mysql',
      port: 3306
    }
  );
}

// Export the Sequelize instance
module.exports = sequelize;








//   This code sets up the database connection using Sequelize. 
//   It first imports the Sequelize package and loads environment variables from the .env file using the dotenv package.

// Then, it checks if the JAWSDB_URL environment variable is set. 

// If it is, it creates a Sequelize instance using the provided URL. 
// This is typically used when deploying the application on Heroku.

// If the JAWSDB_URL environment variable is not set,
//  it creates a Sequelize instance using the local database configuration. It uses the values of DB_NAME,
//   DB_USER, DB_PASSWORD environment variables, and sets the host, dialect, and port for the MySQL database.


// Finally, it exports the Sequelize instance for use in other parts of the application.

// This file is responsible for creating a Sequelize instance based on the environment variables.

// If the JAWSDB_URL environment variable is set, indicating a deployment on Heroku,
//  the Sequelize instance is created using the provided URL. Otherwise, if the JAWSDB_URL is not set,
//   the Sequelize instance is created using the local database configuration specified in the .env file.
//    The created Sequelize instance is then exported for use in other parts of the application.

