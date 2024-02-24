var express = require('express');
var cardController = require('../controllers/card')

var router = express.Router();

router.get("/", cardController.getCardID);
router.post("/create-card", cardController.createCardID); // add this route
router.get("/ids", cardController.getOnlyCardID); // Route to get only card IDs
router.get("/:card_id", cardController.getCardWithNotesEntry);
router.delete("/:cardId", cardController.deleteCard);

module.exports = router;


//to test on postman
// {
//     "date": "2024-01-15"
// }

//card_id: 65d85e678a4c7a42cc02a04b

