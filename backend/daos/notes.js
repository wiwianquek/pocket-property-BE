const mongoose = require("mongoose");
// optional shortcut to the mongoose.Schema class
const Schema = mongoose.Schema;

const notesEntrySchema = new Schema({
    user_id: {
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'User'
    },
    card_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'CardID',
      required: true  // Make sure this is set to required if it should always be present
    },
    entry_title: {
      type: String,
      required: true,
    },
    entry_text: {
      type: String,
      required: true,
    }, 
  }, {
    timestamps: true
  });
  
  module.exports = mongoose.model('NotesEntry', notesEntrySchema);
  



