"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const organizerRoutes_1 = require("./routes/organizerRoutes");
const eventRoutes_1 = require("./routes/eventRoutes");
const ticketRoutes_1 = require("./routes/ticketRoutes");
const purchaserRoutes_1 = require("./routes/purchaserRoutes");
const ticketPurchaseRoutes_1 = require("./routes/ticketPurchaseRoutes");
const midtransClient = require('midtrans-client');
const app = (0, express_1.default)();
// Create Core API / Snap instance (both have shared `transactions` methods)
let apiClient = new midtransClient.Snap({
    isProduction: false,
    serverKey: 'YOUR_SERVER_KEY',
    clientKey: 'YOUR_CLIENT_KEY'
});
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.get('/', (req, res) => {
    res.send({
        status: 'success',
        message: 'API Endpoint for Concert Click!',
        documentation: 'https://documenter.getpostman.com/view/28563924/2s9YsNeAuL'
    });
});
app.use(express_1.default.static('banners'));
app.use('/organizer', (0, organizerRoutes_1.organizerRouter)());
app.use('/event', (0, eventRoutes_1.eventRouter)());
app.use('/ticket', (0, ticketRoutes_1.ticketRouter)());
app.use('/purchaser', (0, purchaserRoutes_1.purchaserRouter)());
app.use('/buy', (0, ticketPurchaseRoutes_1.ticketPurchaseRoutes)());
app.get('/test', (req, res) => {
    console.log('test application success to running');
    res.send('test');
});
app.post('/notification', (req, res, notificationJson) => {
    apiClient.transaction.notification(notificationJson)
        .then((statusResponse) => {
        let orderId = statusResponse.order_id;
        let transactionStatus = statusResponse.transaction_status;
        let fraudStatus = statusResponse.fraud_status;
        console.log(`Transaction notification received. Order ID: ${orderId}. Transaction status: ${transactionStatus}. Fraud status: ${fraudStatus}`);
    });
});
app.listen(3000, () => console.log('Server running on http://localhost:3000'));
//# sourceMappingURL=index.js.map