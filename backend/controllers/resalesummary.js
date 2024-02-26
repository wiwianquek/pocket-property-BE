const modelResaleSummary = require("../models/resalesummary");

module.exports = {
    saveSearchSummary,
    getSearchSummaryByUserId,
    deleteSearchSummary,
};

// Function to save search summary
async function saveSearchSummary(req, res) {
    try {
        const userId = req.user.userId;
        const { searchTerms, unitsFound, averagePrice, averageLeaseTerm } = req.body;

        const newSummary = await modelResaleSummary.saveSearchSummary({
            searchTerms,
            unitsFound,
            averagePrice,
            averageLeaseTerm,
            user: userId
        });

        res.status(201).json({ message: 'Summary saved successfully', summary: newSummary });
    } catch (err) {
        console.error(err); // Log the full error
        res.status(500).json({ errorMsg: err.message });
    }
}


// Function to delete search summary
async function deleteSearchSummary(req, res) {
    try {
        const summaryId = req.params.summaryId; // Ensure that your route parameter matches this name
        await modelResaleSummary.deleteSearchSummaryById(summaryId);

        res.status(200).json({ message: 'Summary deleted successfully' });
    } catch (err) {
        res.status(500).json({ errorMsg: err.message });
    }
}

// Function to get search summaries by user ID
async function getSearchSummaryByUserId(req, res) {
    try {
        const userId = req.user.userId; // Extracted from JWT by your middleware

        const summaries = await modelResaleSummary.getSearchSummariesByUserId(userId);

        res.status(200).json(summaries);
    } catch (err) {
        res.status(500).json({ errorMsg: err.message });
    }
}

