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

// This is the Apollo Server context callback. This is called any time a resolver is triggered and is the function that is called before your resolver, so this is where you pass any data you need to the resolver, most often the express request and response objects.
async function authenticate({ req, res }) {
  try {
    const token = req.cookies.token;

    // If there is no token cookie stored, we just return the req and res to the context (passed to the resolvers), We have to pass the express objects since we'll need the res to send cookies through the register and login resolvers.
    if (!token) return { req, res };

    // Check if the token is valid. If it's not, this will throw an error
    const { user_id } = await validateToken(token);

    // If the token is valid, we send a new fresh token so their expiration is renewed. This is common. As long as the user is using the app and is active, we keep refreshing their token on each request they make.
    if (user_id) {
      const new_token = await createToken(user_id);
      // Send the new token and replace their old one
      res.cookie('token', new_token, { httpOnly: true });
    }

    // Pass the user id and res object to the resolver context
    return { user_id, res };
  } catch (err) {
    // Token is not valid, so we just return the standard req,res object to the resolver context
    return { req, res };
  }
}

module.exports = { createToken, validateToken, authenticate };