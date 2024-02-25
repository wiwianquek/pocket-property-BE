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

// async function calculateAveragePriceAndLease(query) {
//     // Log the incoming query to see what's being passed to the aggregate function.
//     console.log('Aggregation Query:', JSON.stringify(query, null, 2));

//     const result = await ResaleDataEntry.aggregate([
//         { $match: query },
//         { $addFields: {
//             totalLeaseMonths: { 
//                 $add: [
//                     { $multiply: ["$remaining_lease.years", 12] }, 
//                     "$remaining_lease.months"
//                 ] 
//             }
//         }},
//         { $group: {
//             _id: null,
//             averagePrice: { $avg: "$resale_price" },
//             averageRemainingLeaseMonths: { $avg: "$totalLeaseMonths" }
//         }}
//     ]);

//     // Log the result of the aggregate to see what's being returned.
//     console.log('Aggregation Result:', JSON.stringify(result, null, 2));

//     if (result && result.length > 0) {
//         const averageRemainingLease = result[0].averageRemainingLeaseMonths
//             ? (result[0].averageRemainingLeaseMonths / 12).toFixed(2)
//             : null;
//         return {
//             averagePrice: result[0].averagePrice.toFixed(2),
//             averageRemainingLease: averageRemainingLease
//         };
//     }
//     return { averagePrice: "0.00", averageRemainingLease: "0.00" };
// }

async function calculateAveragePriceAndLease(query) {
    // Log the incoming query to see what's being passed to the aggregate function.
    console.log('Aggregation Query:', JSON.stringify(query, null, 2));

    const result = await ResaleDataEntry.aggregate([
        { $match: query },
        { $addFields: {
            totalLeaseMonths: { 
                $add: [
                    { $multiply: ["$remaining_lease.years", 12] }, 
                    "$remaining_lease.months"
                ] 
            }
        }},
        { $group: {
            _id: null,
            averagePrice: { $avg: "$resale_price" },
            averageRemainingLeaseMonths: { $avg: "$totalLeaseMonths" }
        }}
    ]);

    console.log('Aggregation Result:', result); // Debugging line to check the actual aggregation result

    if (result && result.length > 0 && result[0].averagePrice != null) {
        const averageRemainingLeaseYears = result[0].averageRemainingLeaseMonths
            ? (result[0].averageRemainingLeaseMonths / 12).toFixed(2)
            : null;
        return {
            averagePrice: result[0].averagePrice.toFixed(2),
            averageRemainingLeaseYears: averageRemainingLeaseYears
        };
    }
    return { averagePrice: null, averageRemainingLeaseYears: null };
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
    if (query.property_type) {
        searchQuery.flat_model = query.property_type; // Assuming flat_model is property_type in your schema
    }
    if (query.storey_range) {
        searchQuery.storey_range = query.storey_range;
    }
    
    return ResaleDataEntry.find(searchQuery);
}

