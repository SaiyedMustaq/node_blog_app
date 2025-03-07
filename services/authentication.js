const JWT = require("jsonwebtoken");

const secreat = "Mustaq@184512";

function generateToken(user) {
  const payload = {
    _id: user._id,
    email: user.email,
    fullName: user.fullName,
    role: user.role,
  };
  const token = JWT.sign(payload, secreat);
  return token;
}

function verifyToken(token) {
  const payload = JWT.verify(token, secreat);
  return payload;
}

module.exports = {
  generateToken,
  verifyToken,
};
