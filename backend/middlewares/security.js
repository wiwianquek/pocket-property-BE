const utilSecurity = require("../util/security")
const modelUser = require("../models/users");

module.exports = {
    checkJWT,
    checkJWTNotes,
    checkLogin,
    checkPermission
};

function checkJWTNotes(req, res, next) {
  let token = req.headers.authorization;
  if (token) {
    token = token.replace(/^Bearer\s/, "");
    const decoded = utilSecurity.verifyJWT(token);
    if (decoded) {
      req.user = decoded; // payload is now the entire object
      next();
    } else {
      return res.status(401).json({ errorMsg: "Invalid token" });
    }
  } else {
    return res.status(401).json({ errorMsg: "No token provided" });
  }
}

function checkJWT(req, res, next) {
  let token = req.get("Authorization") || req.query.token;
  if (token) {
      token = token.replace("Bearer ", "");
      const decoded = utilSecurity.verifyJWT(token);
      if (decoded) {
          // adjust this according to token's payload structure
          req.user = decoded;
          next();
      } else {
          res.status(401).json({ errorMsg: "Invalid token" });
      }
  } else {
      req.user = null;
      next();
  }
}

function checkLogin(req, res, next) {
    if (!req.user) return res.status(401).json("Unauthorized");
    // A okay
    next();
  };

function checkPermission(req, res, next) {
    if (!req.user) return res.status(401).json("Unauthorized");
    if (req.body.email != req.user.email && req.user.is_admin == false) return res.status(401).json("Unauthorized"); 
    next();
  };


