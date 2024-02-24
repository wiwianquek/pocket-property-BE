const daoCard = require("../daos/card")
const NotesEntry = require("../daos/notes");

module.exports = {
  getCardID,
  createCardID,
  updateCardWithNotesEntry,
  getOnlyCardID, 
  getCardWithNotesEntry,
  deleteCard, 
  removeNoteEntryFromCard,
};

function getCardID(queryFields) {
    return daoCard.find(queryFields);
}


// Function to fetch only the card_id
function getOnlyCardID(queryFields) {
  // This will return only the card IDs and not the entire card data.
  return daoCard.find(queryFields).select('_id -_v');
}


// Function to fetch the card data along with populated notesentry_ids for a specific card
function getCardWithNotesEntry(cardId) {
  // This will return the card with the given ID along with the populated notes entries.
  return daoCard.findById(cardId).populate('notesentry_ids');
}

// function getCardWithNotesEntry(queryFields) {
//   // This will return the cards along with the populated notes entries.
//   return daoCard.find(queryFields).populate('notesentry_ids');
// }

function  createCardID(card) {
    return daoCard.create(card);
}

// Update the card with the notes entry ID, if you're keeping an array of notes IDs on the card
async function updateCardWithNotesEntry(notesEntryId, cardId) {
  try {
    return await daoCard.findByIdAndUpdate(
      cardId,
      { $push: { notesentry_ids: notesEntryId } },
      { new: true }
    );
  } catch (err) {
    throw err;
  }
}

// Use this updated function in your models/card.js
async function deleteCard(cardId) {
  try {
    const card = await daoCard.findById(cardId).populate('notesentry_ids');
    if (card && card.notesentry_ids.length > 0) {
      // Delete associated notes entries
      await Promise.all(card.notesentry_ids.map(noteEntry => NotesEntry.deleteNotesEntry(noteEntry._id)));
    }
    // Then delete the card
    await daoCard.findByIdAndDelete(cardId);
  } catch (err) {
    throw err;
  }
}


// Function to remove a note entry ID from a card's notesentry_ids array
async function removeNoteEntryFromCard(noteEntryId, cardId) {
  try {
      return await daoCard.findByIdAndUpdate(
          cardId, 
          { $pull: { notesentry_ids: noteEntryId } },
          { new: true }
      );
  } catch (err) {
      // Handle error
      throw err;
  }
}


