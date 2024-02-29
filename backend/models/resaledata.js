const ResaleDataEntry = require("../daos/resaledata");

module.exports = {
    getResaleDataEntry,
    searchResaleData,
    deleteResaleDataEntry,
    calculateAveragePriceAndLease, // This function should be here
};

function getResaleDataEntry(queryFields) {
    return ResaleDataEntry.find(queryFields);
}

function deleteResaleDataEntry(entryId) {
    return ResaleDataEntry.findByIdAndDelete(entryId);
}

async function calculateAveragePriceAndLease(query) {
    const aggregation = await ResaleDataEntry.aggregate([
        { $match: query },
        { $addFields: {
            leaseComponents: { $regexFindAll: { input: "$remaining_lease", regex: /(\d+)/g } }
        }},
        { $addFields: {
            totalLeaseMonths: {
                $sum: [
                    { $multiply: [ { $toInt: { $arrayElemAt: [ "$leaseComponents.match", 0 ] } }, 12 ] },
                    { $toInt: { $arrayElemAt: [ "$leaseComponents.match", 1 ] } }
                ]
            }
        }},
        { $group: {
            _id: null,
            averagePrice: { $avg: { $ifNull: [ "$resale_price", 0 ] } },
            averageRemainingLeaseMonths: { $avg: { $ifNull: [ "$totalLeaseMonths", 0 ] } }
        }},
        { $addFields: {
            averageRemainingLeaseYears: { $floor: { $divide: [ "$averageRemainingLeaseMonths", 12 ] } },
            averageRemainingLeaseExtraMonths: { $mod: [ { $floor: "$averageRemainingLeaseMonths" }, 12 ] }
        }}
    ]);

    console.log('Aggregation Result:', aggregation);

    // Initialize summary with default values
    let summary = {
        averagePrice: "0.00",
        averageRemainingLeaseYears: 0,
        averageRemainingLeaseExtraMonths: 0
    };

    // Check if the aggregation result is not empty
    if (aggregation.length > 0) {
        const aggResult = aggregation[0];
        
        // Convert averagePrice to a string with 2 decimal places
        // Use the .toFixed() directly if you're certain that averagePrice is always a number.
        summary.averagePrice = aggResult.averagePrice;
        
        // No need to change for these fields as they are already being calculated as numbers
        summary.averageRemainingLeaseYears = Math.floor(aggResult.averageRemainingLeaseYears);
        summary.averageRemainingLeaseExtraMonths = aggResult.averageRemainingLeaseExtraMonths;
    }

    return summary;
}


function searchResaleData(query) {
    let searchQuery = {};
    if (query.town) {
        searchQuery.town = new RegExp(query.town, 'i');
    }
    if (query.street_name) {
        searchQuery.street_name = new RegExp(query.street_name, 'i');
    }
    if (query.flat_type) {
        searchQuery.flat_type = query.flat_type;
    }
    if (query.flat_model) {
        searchQuery.flat_model = query.flat_model; 
    }
    if (query.storey_range) {
        searchQuery.storey_range = query.storey_range;
    }
    console.log("search query debug:", searchQuery)
    return ResaleDataEntry.find(searchQuery);
}


  