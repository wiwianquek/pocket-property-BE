const modelResaleData = require("../models/resaledata");

module.exports = {
    getResaleDataEntry,
    deleteResaleDataEntry,
    searchResaleData,
};

async function getResaleDataEntry(req, res) {
    try {
        const userId = req.user.userId; 
        const resaledataEntry = await modelResaleData.getResaleDataEntryByUserId(userId);
        res.json(resaledataEntry);
    } catch (err) {
        res.status(500).json({ errorMsg: err.message });
    }
}

async function searchResaleData(req, res) {
    try {
      const { town, street_name, flat_type, flat_model, storey_range } = req.query;
      let query = {};
  
      // Construct the query with the provided parameters
      if (town) {
        query.town = new RegExp(town, 'i');
      }
      if (street_name) {
        query.street_name = new RegExp(street_name, 'i');
      }
      if (flat_type) {
        // Handle multiple flat_type values
        query.flat_type = Array.isArray(flat_type) ? { $in: flat_type } : flat_type;
      }// Handle multiple flat_model values
      if (flat_model) {
        query.flat_model = Array.isArray(flat_model) ? { $in: flat_model } : flat_model;
      }
      if (storey_range) {
        // Handle multiple storey_range values
        query.storey_range = Array.isArray(storey_range) ? { $in: storey_range } : storey_range;
      }
  
      // Perform the search
      const results = await modelResaleData.searchResaleData(query);
  
      // Calculate the average price and remaining lease
      const summary = await modelResaleData.calculateAveragePriceAndLease(query);

      console.log('Average price type:', typeof summary.averagePrice);
  
      // Create a summary object including the totalUnitsFound
      const summaryWithCount = {
        unitsFound: results.length,
        averagePrice: summary.averagePrice ? summary.averagePrice.toFixed(2) : "0.00",
        averageRemainingLeaseYears: summary.averageRemainingLeaseYears ? summary.averageRemainingLeaseYears.toFixed(0) : "0",
        averageRemainingLeaseExtraMonths: summary.averageRemainingLeaseExtraMonths ? summary.averageRemainingLeaseExtraMonths.toFixed(0) : "0"
      };
  
      // Log the summary with count
      console.log({ summary: summaryWithCount });
  
      // Respond with the results and summary information
      res.json({
        results,
        summary: summaryWithCount,
        searchTerms: req.query // Include the search terms in the response
      });
  
    } catch (err) {
      // Handle any errors that may occur
      console.error(err); // Log the error for debugging purposes
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