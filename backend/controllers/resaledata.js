const modelResaleData = require("../models/resaledata");

module.exports = {
    getResaleDataEntry,
    deleteResaleDataEntry,
    searchResaleData,
};

async function getResaleDataEntry(req, res) {
    try {
        const userId = req.user.userId; // Adjust to match the structure of your JWT payload
        const resaledataEntry = await modelResaleData.getResaleDataEntryByUserId(userId);
        res.json(resaledataEntry);
    } catch (err) {
        res.status(500).json({ errorMsg: err.message });
    }
}

// 

async function searchResaleData(req, res) {
    try {
        const { town, street_name, flat_type, property_type, storey_range } = req.query;
        let query = {};

        // Construct the query with the provided parameters
        if (town) {
            query.town = new RegExp(town, 'i');
        }
        if (street_name) {
            query.street_name = new RegExp(street_name, 'i');
        }
        if (flat_type) {
            query.flat_type = flat_type;
        }
        if (property_type) {
            query.flat_model = property_type;
        }
        if (storey_range) {
            query.storey_range = storey_range;
        }

        // Perform the search
        const results = await modelResaleData.searchResaleData(query);

        // Calculate the average price and remaining lease
        const summary = await modelResaleData.calculateAveragePriceAndLease(query);
        
        // Respond with the results and summary information
        res.json({
            results,
            count: results.length,
            // averagePrice: summary.averagePrice ? summary.averagePrice.toFixed(2) : "0.00",
            // averageRemainingLease: summary.averageRemainingLease ? summary.averageRemainingLease.toFixed(2) : "0.00",
            averagePrice: summary.averagePrice ? summary.averagePrice : "0.00",
            averageRemainingLease: summary.averageRemainingLeaseYears ? summary.averageRemainingLeaseYears : "0.00",
            searchTerms: req.query // Include the search terms in the response
        });
    } catch (err) {
        // Handle any errors that may occur
        res.status(500).json({ errorMsg: err.message });
    }
}

async function deleteResaleDataEntry(req, res) {
    try {
        const entryId = req.params.entryId;
        const userId = req.user.userId;

        const resaledata = await modelResaleData.getResaleDataEntryById(entryId);
        if (!resaledata || resaledata.user_id.toString() !== userId) {
            return res.status(403).json({ errorMsg: "Unauthorized" });
        }

        await modelResaleData.deleteResaleDataEntry(entryId);
        res.status(204).send();
    } catch (err) {
        res.status(500).json({ errorMsg: err.message });
    }
}


