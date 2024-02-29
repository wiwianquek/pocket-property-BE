const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const resaleDataEntrySchema = new Schema({
  month: String,
  town: String,
  flat_type: String,
  block: String,
  street_name: String,
  storey_range: String,
  floor_area_sqm: Number,
  flat_model: String,
  lease_commence_date: Number, 
  remaining_lease: {
    years: Number,
    months: Number
  },
  resale_price: Number,
  user_id: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User',
    required: false // set to false if the user_id is optional
  }
}, {
    timestamps: true, // this will add createdAt and updatedAt timestamps
    collection: 'resaledataentry' 
  });
  

module.exports = mongoose.model('ResaleDataEntry', resaleDataEntrySchema);

