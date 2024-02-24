const modelCards = require("../models/card")

module.exports = {
  getCardID,
  createCardID,
  getOnlyCardID, 
  getCardWithNotesEntry,
  deleteCard, 
  removeNoteEntryFromCard,
};

async function getCardID(req, res) {
    try {
      const cardData = await modelCards.getCardID({});
      res.json(cardData); // No need for {card: cardData} if you want an array back
    } catch (err) {
      res.status(500).json({ errorMsg: err.message });
    }
  }
  

async function createCardID(req, res) {
    try {
      const cardData = await modelCards.createCardID(req.body); // req.body is likely empty here
      res.json(cardData); // Send back the new card data
    } catch (err) {
      res.status(500).json({ errorMsg: err.message });
    }
  }

async function getOnlyCardID(req, res) {
  try {
      const cardIDs = await modelCards.getOnlyCardID({});
      res.json(cardIDs);
  } catch (err) {
      res.status(500).json({ errorMsg: err.message });
  }
}

async function getCardWithNotesEntry(req, res) {
  try {
      const cardId = req.params.card_id; // Assuming you pass the card_id as a URL parameter
      const card = await modelCards.getCardWithNotesEntry(cardId);
      res.json(card);
  } catch (err) {
      res.status(500).json({ errorMsg: err.message });
  }
}

async function deleteCard(req, res) {
  try {
    await modelCards.deleteCard(req.params.cardId);
    res.status(204).send(); // 204 No Content
  } catch (err) {
    res.status(500).json({ errorMsg: err.message });
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
