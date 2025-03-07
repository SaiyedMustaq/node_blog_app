const { verifyToken } = require("../services/authentication");

function authCheckWithCoockie(coockieName) {
  return (req, res, next) => {
    const tokenValue = req.cookies[coockieName];

    if (!tokenValue) {
      return next();
    }

    try {
      const uPayload = verifyToken(tokenValue);
      req.user = uPayload;
    } catch (error) {}
    return next();
  };
}

module.exports = {
  authCheckWithCoockie,
};
