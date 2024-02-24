var jwt = require('jsonwebtoken');

module.exports = {
    createJWT,
    getExpiry,
    verifyJWT
}

function createJWT(user) {
    // user is an object containing the user's details
    return jwt.sign(user, process.env.SECRET, { expiresIn: '24h' });
  }

  
function getExpiry(token) {
    const payloadBase64 = token.split('.')[1];
    const decodedJson = Buffer.from(payloadBase64, 'base64').toString();
    const decoded = JSON.parse(decodedJson)
    const exp = decoded.exp;
    return exp
}

function verifyJWT(token) {
    try {
      return jwt.verify(token, process.env.SECRET);
      // No need to access decoded.payload, as the payload is now the root
    } catch (err) {
      console.error("Token verification error:", err);
      return null;
    }
  }


