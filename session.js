const session = require('express-session');

module.exports = session({
  secret: 'EOI6ABAAZNEMCBFQT0TF',
  resave: true,
  saveUninitialized: false,
  cookie: {
    // Should be true on production, see https://www.npmjs.com/package/express-session
    secure: false
  }
});