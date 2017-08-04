const session = require('express-session');

module.exports = session({
  secret: process.env.SESSION_SECRET,
  resave: true,
  saveUninitialized: false,
  cookie: {
    // Should be true on production, see https://www.npmjs.com/package/express-session
    secure: false
  }
});