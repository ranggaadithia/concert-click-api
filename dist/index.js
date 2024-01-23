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
let apiClient = new midtransClient.Snap({
    isProduction: false,
    serverKey: process.env.MIDTRANS_SERVER_KEY,
    clientKey: process.env.MIDTRANS_CLIENT_KEY
});
app.post('/notification', (req, res) => {
    const notificationJson = req.body; // Assuming notification data is in the request body
    apiClient.transaction.notification(notificationJson)
        .then((statusResponse) => {
        let orderId = statusResponse.order_id;
        let transactionStatus = statusResponse.transaction_status;
        let fraudStatus = statusResponse.fraud_status;
        console.log(`Transaction notification received. Order ID: ${orderId}. Transaction status: ${transactionStatus}. Fraud status: ${fraudStatus}`);
        if (transactionStatus == 'capture') {
            if (fraudStatus == 'accept') {
                // TODO set transaction status on your database to 'success'
                console.log('success');
                // and response with 200 OK
                res.status(200).send('OK');
            }
        }
        else if (transactionStatus == 'settlement') {
            // TODO set transaction status on your database to 'success'
            // and response with 200 OK
            console.log('settlement');
            res.status(200).send('OK');
        }
        else if (transactionStatus == 'cancel' ||
            transactionStatus == 'deny' ||
            transactionStatus == 'expire') {
            // TODO set transaction status on your database to 'failure'
            // and response with 200 OK
            console.log('failure');
            res.status(200).send('failure');
        }
        else if (transactionStatus == 'pending') {
            // TODO set transaction status on your database to 'pending' / waiting payment
            // and response with 200 OK
            console.log('pending');
            res.status(200).send('pending');
        }
    })
        .catch((error) => {
        console.error('Error processing notification:', error);
        res.status(500).send('Internal Server Error');
    });
});
app.listen(3000, () => console.log('Server running on http://localhost:3000'));
//# sourceMappingURL=index.js.map