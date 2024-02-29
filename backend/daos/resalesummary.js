const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const resalesummarySchema = new mongoose.Schema({
    searchTerms: {
        town: String,
        flat_type: [String], 
        flat_model: [String], 
        storey_range: [String] 
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

