const authConfig = {
  secret: process.env.APP_SECRET,
  expiresIn: '7d',
  url: process.env.APP_URL,
};

module.exports = authConfig;