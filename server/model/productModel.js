const mongoose = require('../config/dbConnect')

const Schema = mongoose.Schema;


const ProductSchema = new Schema({
    title: String,
    createdAt: String
}, {
    collection: 'product'
});

const Product = mongoose.model('product', ProductSchema);


// Product.create([
//     {
//         "id": "1",
//         "title": "International Tactics Consultant",
//         "createdAt": "2020-01-03T15:34:43.617Z"
//     },
//     {
//         "id": "2",
//         "title": "Global Group Specialist",
//         "createdAt": "2020-01-03T20:44:55.880Z"
//     },
//     {
//         "id": "3",
//         "title": "Legacy Assurance Liaison",
//         "createdAt": "2020-01-03T23:50:50.884Z"
//     },
//     {
//         "id": "4",
//         "title": "Corporate Intranet Assistant",
//         "createdAt": "2020-01-03T20:42:23.369Z"
//     },
//     {
//         "id": "5",
//         "title": "Lead Operations Orchestrator",
//         "createdAt": "2020-01-04T05:54:55.546Z"
//     },
//     {
//         "id": "6",
//         "title": "Investor Optimization Producer",
//         "createdAt": "2020-01-04T00:25:37.662Z"
//     },
//     {
//         "id": "7",
//         "title": "Dynamic Branding Director",
//         "createdAt": "2020-01-04T06:52:47.505Z"
//     },
//     {
//         "id": "8",
//         "title": "Customer Group Planner",
//         "createdAt": "2020-01-03T19:59:17.489Z"
//     },
//     {
//         "id": "9",
//         "title": "Dynamic Accounts Strategist",
//         "createdAt": "2020-01-04T12:51:20.201Z"
//     },
//     {
//         "id": "10",
//         "title": "Future Interactions Strategist",
//         "createdAt": "2020-01-03T22:27:37.678Z"
//     },
//     {
//         "id": "11",
//         "title": "Global Group Director",
//         "createdAt": "2020-01-04T14:12:40.274Z"
//     },
//     {
//         "id": "12",
//         "title": "Principal Configuration Coordinator",
//         "createdAt": "2020-01-04T14:42:03.895Z"
//     },
//     {
//         "id": "13",
//         "title": "Corporate Accountability Planner",
//         "createdAt": "2020-01-04T10:52:26.622Z"
//     },
//     {
//         "id": "14",
//         "title": "Global Infrastructure Analyst",
//         "createdAt": "2020-01-04T02:39:20.572Z"
//     },
//     {
//         "id": "15",
//         "title": "Human Optimization Liaison",
//         "createdAt": "2020-01-04T01:02:18.963Z"
//     },
//     {
//         "id": "16",
//         "title": "Senior Quality Designer",
//         "createdAt": "2020-01-03T20:54:33.904Z"
//     },
//     {
//         "id": "17",
//         "title": "District Data Director",
//         "createdAt": "2020-01-03T17:22:45.154Z"
//     },
//     {
//         "id": "18",
//         "title": "Internal Division Assistant",
//         "createdAt": "2020-01-03T23:34:38.199Z"
//     },
//     {
//         "id": "19",
//         "title": "Central Applications Developer",
//         "createdAt": "2020-01-04T14:13:56.157Z"
//     },
//     {
//         "id": "20",
//         "title": "Global Operations Specialist",
//         "createdAt": "2020-01-03T22:56:47.422Z"
//     }
// ])

// console.log(d.toLocaleTimeString());

module.exports = Product;