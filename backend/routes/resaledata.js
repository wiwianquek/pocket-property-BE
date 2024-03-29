var express = require('express');
var resaledataController = require('../controllers/resaledata')
var securityMiddleware = require('../middlewares/security')


var router = express.Router();

// Apply checkJWT middleware to routes that require JWT verification
router.get("/search", securityMiddleware.checkJWT, resaledataController.searchResaleData);
router.get("/", securityMiddleware.checkJWTNotes, resaledataController.getResaleDataEntry); 
router.delete("/:entryId", securityMiddleware.checkJWTNotes, resaledataController.deleteResaleDataEntry);


module.exports = router;

//For the search functions, can search by town or street_name
//GET http://localhost:3000/resaledata/search?town=Bedok
//GET http://localhost:3000/resaledata/search?street_name=Ave 4
//GET http://localhost:3000/resaledata/search?town=Bedok&street_name=Ave 4
// http://localhost:3000/resaledata/search?search=bedok&flat_type=1%20ROOM&flat_type=2%20ROOM&flat_model=Improved&flat_model=Standard&storey_range=01%20TO%2003&storey_range=04%20TO%2006

