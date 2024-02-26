var express = require('express');
var resaledataController = require('../controllers/resalesummary')
var securityMiddleware = require('../middlewares/security')


var router = express.Router();

// Apply checkJWT middleware to routes that require JWT verification
router.post("/saveSummary", securityMiddleware.checkJWT, resaledataController.saveSearchSummary);
router.delete("/:summaryId", securityMiddleware.checkJWT, resaledataController.deleteSearchSummary);
router.get("/summaries", securityMiddleware.checkJWT, resaledataController.getSearchSummaryByUserId);


module.exports = router;

