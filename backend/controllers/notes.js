const modelNotes = require("../models/notes");
const modelCards = require("../models/card");
// No need to require jwt and JWT_SECRET here as we use the utility functions

module.exports = {
    getNotesEntry,
    createNotesEntry,
    updateNotesEntry,
    deleteNotesEntry,
    getNotesEntryById,
};

async function getNotesEntry(req, res) {
    try {
        const userId = req.user.userId; // Adjust to match the structure of your JWT payload
        const notesEntries = await modelNotes.getNotesEntryByUserId(userId);
        res.json(notesEntries);
    } catch (err) {
        res.status(500).json({ errorMsg: err.message });
    }
}

async function createNotesEntry(req, res) {
    try {
        if (!req.user || !req.user.userId) {
            return res.status(400).json({ errorMsg: "User information is missing from the request" });
        }
        const userId = req.user.userId;
        let cardId = req.body.card_id;
        if (!cardId) {
            const card = await modelCards.createCardID({ user_id: userId });
            cardId = card._id;
        }

        const notesEntry = await modelNotes.createNotesEntry({
            ...req.body,
            user_id: userId,
            card_id: cardId,
        });

        res.status(201).json(notesEntry);
    } catch (err) {
        res.status(500).json({ errorMsg: err.message });
    }
}

// Updates a note entry
async function updateNotesEntry(req, res) {
    try {
        const entryId = req.params.entryId;
        const updatedEntry = await modelNotes.updateNotesEntry(entryId, req.body);
        res.json(updatedEntry);
    } catch (err) {
        res.status(500).json({ errorMsg: err.message });
    }
}

// Gets a single note entry by ID
async function getNotesEntryById(req, res) {
    try {
        const entryId = req.params.entryId;
        const notesEntry = await modelNotes.getNotesEntryById(entryId);
        if (!notesEntry) {
            res.status(404).json({ errorMsg: "Note entry not found" });
        } else {
            res.json(notesEntry);
        }
    } catch (err) {
        res.status(500).json({ errorMsg: err.message });
    }
}

// Deletes a note entry
async function deleteNotesEntry(req, res) {
    try {
        const entryId = req.params.entryId;
        const userId = req.user.userId;

        const note = await modelNotes.getNotesEntryById(entryId);
        if (!note || note.user_id.toString() !== userId) {
            return res.status(403).json({ errorMsg: "Unauthorized" });
        }

        await modelNotes.deleteNotesEntry(entryId);
        res.status(204).send();
    } catch (err) {
        res.status(500).json({ errorMsg: err.message });
    }
}

