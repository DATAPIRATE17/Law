const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ message: 'Authentication failed: No token provided' });
    }
    const decodedToken = jwt.verify(token, '4cf173ee0241461f33e64f1c46202c53c3f4fd37366d78dbdf59c0994ba6773a');
    req.userData = { userId: decodedToken.userId };
    next();
  } catch (error) {
    console.error('Authentication failed:', error.message);
    return res.status(401).json({ message: 'Authentication failed: Invalid token' });
  }
};
