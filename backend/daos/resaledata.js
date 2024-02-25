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
  lease_commence_date: Number, // Use Number if this is always a year and does not include month or day
  remaining_lease: {
    years: Number,
    months: Number
  },
  resale_price: Number,
  user_id: {
    type: mongoose.Schema.Types.ObjectId, // This assumes you have a User model and each entry is linked to a User.
    ref: 'User',
    required: false // Set to false if the user_id is optional
  }
}, {
    timestamps: true, // this will add createdAt and updatedAt timestamps
    collection: 'resaledataentry' // Explicitly set the collection name here
  });
  

module.exports = mongoose.model('ResaleDataEntry', resaleDataEntrySchema);

