const jwt = require('jsonwebtoken');
const authConfig = require('../configs/auth');

const checkJwt = (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (!token) {
        return res.status(401).json({ message: 'missing auth token' });
    }
    const decodedToken = jwt.verify(token, authConfig.secret);
    req.userInfo = decodedToken.dataUser;
    res.setHeader('token', decodedToken);
    next();
  } catch (error) {
    res.status(401).json({ message: 'jwt malformed' });
  }
};

const checkJwtNoAuth = (req, res, next) => {
    try {
        const token = req.headers.authorization;
        
        if (token) {
            const decodedToken = jwt.verify(token, authConfig.secret);
            req.userInfo = decodedToken.dataUser;
            res.setHeader('token', decodedToken);
            next();
        } else {
            next();
        }
    } catch (error) {
      res.status(401).json({ message: 'jwt malformed' });
    }
  };

module.exports = { checkJwt, checkJwtNoAuth };