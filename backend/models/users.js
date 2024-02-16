const { urlencoded } = require("express");
const daoUser = require("../daos/users")
const utilSecurity = require("../util/security")

module.exports = {
    getUsers,
    getLoginDetails,
    loginUser,
    logoutUser,
    createUser,
    returnUserIDbyEmail,
    returnEmailbyUserID,
  };

function getUsers(queryFields) {
    return daoUser.find(queryFields);
}

async function getLoginDetails(queryFields) {
  const loginFields = {
    name : 1,
    salt: 1,
    iterations: 1
  } 
  if (!queryFields.hasOwnProperty("email")){
    return {success: false, error: "missing email"};
  }
  // url decode email '@' -> %40 
  const userEmail = decodeURIComponent(queryFields.email);
  const loginFieldsRes = await daoUser.findOne({"email": userEmail}, loginFields);
  return {success: true, data: loginFieldsRes};
}

async function loginUser(body) {
  console.log(process.env.SECRET)
  if (!body.hasOwnProperty("email")) {
    return {success: false, error: "missing email"};
  }
  if (!body.hasOwnProperty("password")) {
    return {success: false, error: "missing password"};
  }

  const user = await daoUser.findOne({"email": body.email, "password": body.password});
  if (user == null || Object.keys(user).length == 0) {
    return {success: false, error: "Invalid email/password"};
  }
  
  const jwtPayload = {
    user: user.name,
    userId: user._id,
    email: user.email,
    is_admin: user.is_admin
  };
  console.log(jwtPayload)
  const token = utilSecurity.createJWT(jwtPayload);
  const expiry = utilSecurity.getExpiry(token);
  daoUser.updateOne({"email": body.email}, {token: token, expire_at: expiry})
  return {success: true, data: token}
}

async function createUser(body) {
    //
    const user = await daoUser.findOne({"email": body.email});
    console.log(user);
    if (user) {
      return {success: false, error: "user already exist"};
    }
    const newUser = await daoUser.create(body);
    return {success: true, data: newUser};
  }

async function logoutUser(body) {
  if (!body.hasOwnProperty("email")) {
    return {success: false, error: "missing email"};
  }
  daoUser.updateOne({"email": body.email}, {token: null, expire_at: null})
  return {success: true, data: "logout success"}
}

//return userid | added this function so that we can use it in the create journal function
async function returnUserIDbyEmail(body){
  const user = await daoUser.findOne({"email": body.payload.email});
  return user._id;
  
}

async function returnEmailbyUserID(userID){
  const user = await daoUser.findOne({"_id": userID})
  return user.email; 
  
} 