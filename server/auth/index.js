const jwt = require('jsonwebtoken');

async function createToken(user_id) {
  const token = await jwt.sign({
    user_id
  }, process.env.JWT_SECRET, { expiresIn: '10m' });

  return token;
}

async function validateToken(token) {
  const is_valid = await jwt.verify(token, process.env.JWT_SECRET, {
    maxAge: '10m'
  });

  return is_valid;
}

async function authenticate({ req, res }) {
  try {
    const token = req.cookies.token;

    if (!token) return {};

    const { user_id } = await validateToken(token);

    return { user_id, res };
  } catch (err) {
    return {};
  }
}

module.exports = { createToken, validateToken, authenticate };