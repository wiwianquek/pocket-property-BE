var express = require('express');
var notesController = require('../controllers/notes')
var securityMiddleware = require('../middlewares/security')


var router = express.Router();

// //TODO: Remember to add middleware to check JWT permission
// router.get("/:entryId", securityMiddleware.checkPermission, notesController.getNotesEntryById);
// router.get("/", securityMiddleware.checkPermission, notesController.getNotesEntry); // General search or get all entries
// router.post("/create-notes", securityMiddleware.checkPermission, notesController.createNotesEntry);
// //delete journal entry by id
// router.put("/:entryId",securityMiddleware.checkPermission, notesController.updateNotesEntry);
// router.delete("/:entryId",securityMiddleware.checkPermission, notesController.deleteNotesEntry);

// Apply checkJWT middleware to routes that require JWT verification
router.get("/:entryId", securityMiddleware.checkJWTNotes, notesController.getNotesEntryById);
router.get("/", securityMiddleware.checkJWTNotes, notesController.getNotesEntry); // General search or get all entries
router.post("/create-notes", securityMiddleware.checkJWTNotes, notesController.createNotesEntry);
router.put("/:entryId", securityMiddleware.checkJWTNotes, notesController.updateNotesEntry);
router.delete("/:entryId", securityMiddleware.checkJWTNotes, notesController.deleteNotesEntry);

module.exports = router;



//to test on postman
// {
//     "user_id": "65d48ab00fdc197311929f4c",
//     "card_id": "65a6aa0d2302804f074118af",
//     "entry_title": "help",
//     "entry_description": "test test test",
//     "entry_text": "testingggg",
//   }

//token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7InVzZXJJZCI6IjY1Y2Y5MzVmYzg2MTZiNDYwYmZmZDFjYyIsImVtYWlsIjoidml2aWFuQGdtYWlsLmNvbSIsImlzX2FkbWluIjpmYWxzZX0sImlhdCI6MTcwODY3NzI3NSwiZXhwIjoxNzA4NzYzNjc1fQ.b0ZCWouC9vJp7zHv4LIjhLf5JWNygF0Xw7EVwKVsUXk
//card_id: 65d95ef671c3f6f41cc6b9ec

