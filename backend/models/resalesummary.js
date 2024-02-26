const ResaleSummary = require("../daos/resalesummary");

module.exports = {
    saveSearchSummary,
    getSearchSummariesByUserId,
    deleteSearchSummaryById
};

function saveSearchSummary(summaryData) {
    return ResaleSummary.create(summaryData);
}

function deleteSearchSummaryById(summaryId) {
    return ResaleSummary.findByIdAndDelete(summaryId);
}

function getSearchSummariesByUserId(userId) {
    return ResaleSummary.find({ user: userId });
}

