const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
    first_name: {
        type: String,
        required: true,
      },
    last_name: {
        type: String,
        required: true,
      },
    username: {
        type: String,
        required: true,
      },  
    email: {
        type: String,
        required: true,
      },
    password: {
        type: String,
        required: true,
      }, 
    salt: {
        type: String,
        required: true,
      },
    iterations: {
        type: Number,
        required: true,
      },
    token: {
      type: String
    },
    expire_at: {
      type: Number
    },
    is_admin: {
      type: Boolean,
      default: false
    }
  }, {
    timestamps: true
  });
  
module.exports = mongoose.model("User", userSchema);
