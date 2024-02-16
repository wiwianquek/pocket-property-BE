const modelUsers = require("../models/users")

// highlight-start
module.exports = {
    getUsers,
    getLoginDetails,
    logoutUser,
    loginUser,
    createUser
}

async function getUsers(req, res) {
    try {
        const userData = await modelUsers.getUsers(req.query);
        res.json({users: userData})
    } catch (err) {
        res.status(500).json({ errorMsg: err.message });
    }
}

async function getLoginDetails(req, res) {
  try {
      const loginDetails = await modelUsers.getLoginDetails(req.query);
      if (loginDetails.success != true) {
        res.status(400).json({errorMsg: loginDetails.error})
        return
      }
      res.json(loginDetails.data)
  } catch (err) {
      res.status(500).json({ errorMsg: err.message });
  }
}

async function loginUser(req, res) {
  
  try {
      const token = await modelUsers.loginUser(req.body);
      if (!token.success) {
        res.status(400).json({errorMsg: token.error})
        return 
      }
      // console.log (token.data)
      res.json(token.data)
  } catch (err) {
    console.log (err);
      res.status(500).json({ errorMsg: err.message });
  }
}

async function logoutUser(req, res) {
  try {
    const userData = await modelUsers.logoutUser(req.body);
    res.json(userData);
  } catch (err) {
    res.status(500).json({ errorMsg: err.message });
  }
} 


async function createUser(req, res) {
  try {
    const userData = await modelUsers.createUser(req.body);
    
    res.status(201).json(userData); //note 200 for success and 201 for created

    // TODO: Redirect in front end to login page after successful registration
    // Commenting this out coz we are redirecting in the front end
    // res.redirect('/users'); 
  } catch (err) {
    // Typically some sort of validation error
    console.log(err);
    res.status(500).json({ errorMsg: err.message });
  }
}
