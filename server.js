// Import required dependencies
const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const routes = require('./controllers');
const helpers = require('./utils/helpers');
const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

// Create an instance of Express.js
const app = express();

// Set the port to either the environment variable PORT or 3001
const PORT = process.env.PORT || 3001;

// Set up Handlebars.js engine with custom helpers
const hbs = exphbs.create({ helpers });

// Configure session options
const sess = {
  secret: 'Super secret secret', // Secret used to sign the session ID cookie
  cookie: {
    // Configuration for the session ID cookie
    maxAge: 300000,
    httpOnly: true,
    secure: false,
    sameSite: 'strict',
  },
  resave: false, // Whether to save the session back to the session store if it was not modified
  saveUninitialized: true, // Whether to save uninitialized sessions to the session store
  store: new SequelizeStore({
    // Session store using Sequelize
    db: sequelize, // Sequelize instance for the session store
  }),
};

// Use the session middleware with the configured session options
app.use(session(sess));

// Set the template engine to Handlebars
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// Parse incoming requests with JSON payloads and URL-encoded request bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Use routes defined in the 'controllers' module
app.use(routes);

// Sync the Sequelize models and start the server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});

// This code sets up the server for the application using Express.js. Here's a breakdown of what each part does:

// Import required dependencies: The path, express, session, express-handlebars, routes, helpers, sequelize,
// and SequelizeStore modules are imported.

// Create an instance of Express.js: The app variable is assigned the value of express(),
// creating an instance of the Express.js application.

// Set the port: The PORT variable is set to either the value of the environment variable PORT or 3001.

// Set up Handlebars.js engine: The hbs variable is assigned the value of exphbs.create({ helpers }),
// creating an instance of the Handlebars.js engine with custom helpers.

// Configure session options: The sess variable is assigned an object with options for the session middleware.
// It includes a secret, cookie settings, and a store for session data using Sequelize.

// Use session middleware: The app.use(session(sess)) line adds the session middleware to the application.

// Set the template engine: The app.engine('handlebars', hbs.engine) line sets the template engine to Handlebars.js,
// and app.set('view engine', 'handlebars') sets the default file extension for views to .handlebars.

// Parse request bodies: The app.use(express.json()) line adds middleware to parse JSON request bodies,
// and app.use(express.urlencoded({ extended: true })) adds middleware to parse URL-encoded request bodies.

// Serve static files: The app.use(express.static(path.join(__dirname, 'public'))) line serves static files from the public directory.

// Use routes: The app.use(routes) line adds the routes defined in the controllers module to the application.

// Sync Sequelize models and start the server: The sequelize.sync({ force: false }) line synchronizes the Sequelize models with the database.
//  Once the synchronization is complete, the server starts listening on the specified port, and a message is logged to the console.
