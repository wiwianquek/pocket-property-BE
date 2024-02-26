const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const resalesummarySchema = new mongoose.Schema({
    searchTerms: {
        town: String,
        flat_type: [String], // Changed to an array of strings
        property_type: [String], // Changed to an array of strings
        storey_range: [String] // Changed to an array of strings
    },
    unitsFound: Number,
    averagePrice: String,
    averageLeaseTerm: String,
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
});

  
module.exports = mongoose.model('ResaleSummary', resalesummarySchema);

