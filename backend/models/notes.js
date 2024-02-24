const NotesEntry = require("../daos/notes");

module.exports = {
  getNotesEntry,
  getNotesEntryById,
  createNotesEntry,
  getNotesEntryByUserId,
  updateNotesEntry,
  deleteNotesEntry,
  getNotesEntryByCardId,
};

// This function will return a promise that resolves to the list of entries that match the query fields
function getNotesEntry(queryFields) {
    return NotesEntry.find(queryFields);
}

// This function will return a promise that resolves to the note entry object that was created
function createNotesEntry(NotesEntryData) {
    console.log(NotesEntryData);
    return NotesEntry.create(NotesEntryData);
}

// This function will return a promise that resolves to the note entry object with the specified ID
function getNotesEntryById(id) {
    return NotesEntry.findById(id);
}

// Get note entry by userid
function getNotesEntryByUserId(userId) {
    return NotesEntry.find({ user_id: userId });
}

// Update a note entry
function updateNotesEntry(entryId, entryData) {
    return NotesEntry.findByIdAndUpdate(entryId, entryData, { new: true }); // { new: true } returns the updated document
}

// Delete a note entry
function deleteNotesEntry(entryId) {
    return NotesEntry.findByIdAndDelete(entryId);
}

// In your notes model
function getNotesEntryByCardId(cardId) {
    return NotesEntry.find({ card_id: cardId }).exec(); // Make sure to use .exec() to return a true Promise
}
