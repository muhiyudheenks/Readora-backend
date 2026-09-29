const Order = require('../models/orderModel')


//revenue
const revenueData = async (req, res, next) => {
    try {
        const result = await Order.aggregate([
            {
                $group: {
                    _id: { $dateToString: { format: "%m/%d/%Y", date: "$createdAt" } },
                    revenue: { $sum: "$totalAmount" }
                }
            },
            {
                $project: { _id: 0, date: "$_id", revenue: 1 }
            },
            { $sort: { date: 1 } }
        ])
        res.json(result)
    } catch (error) {
        next(error)
    }
}

//aov data
const aovData = async (req, res, next) => {
    try {
        const aovData = await Order.aggregate([
            {
                $group: {
                    _id: { $dateToString: { format: "%m/%d/%Y", date: "$createdAt" } },
                    total: { $sum: "$totalAmount" },
                    count: { $sum: 1 }
                }
            },
            {
                $project: {
                    _id: 0,
                    date: "$_id",
                    total: 1,
                    count: 1,
                    aov: { $round: [{ $divide: ["$total", "$count"] }, 0] }
                }
            },
            { $sort: { date: 1 } }
        ]);
        res.json(aovData);
    } catch (error) {
        next(error)
    }
}
//total reveue
const totalRevenue = async (req, res) => {
    const [result] = await Order.aggregate([
        { $group: { _id: null, total: { $sum: "$totalAmount" } } }
    ]);
    res.json(result?.total || 0);
}
module.exports = {
    revenueData, aovData, totalRevenue
}

// const Order = require('../models/orderModel')

// const getDashboardData = async (req, res, next) => {
//     try {
//         const [revenueData, aovData, totalData] = await Promise.all([
//             // revenue
//             Order.aggregate([
//                 {
//                     $group: {
//                         _id: { $dateToString: { format: "%m/%d/%Y", date: "$createdAt" } },
//                         revenue: { $sum: "$totalAmount" }
//                     }
//                 },
//                 { $project: { _id: 0, date: "$_id", revenue: 1 } },
//                 { $sort: { date: 1 } }
//             ]),

//             // aov
//             Order.aggregate([
//                 {
//                     $group: {
//                         _id: { $dateToString: { format: "%m/%d/%Y", date: "$createdAt" } },
//                         total: { $sum: "$totalAmount" },
//                         count: { $sum: 1 }
//                     }
//                 },
//                 {
//                     $project: {
//                         _id: 0,
//                         date: "$_id",
//                         total: 1,
//                         count: 1,
//                         aov: { $round: [{ $divide: ["$total", "$count"] }, 0] }
//                     }
//                 },
//                 { $sort: { date: 1 } }
//             ]),

//             // total revenue
//             Order.aggregate([
//                 { $group: { _id: null, total: { $sum: "$totalAmount" } } }
//             ])
//         ])

//         res.json({
//             revenueData,
//             aovData,
//             totalRevenue: totalData[0]?.total || 0
//         })

//     } catch (error) {
//         next(error)
//     }
// }

// module.exports = { getDashboardData }