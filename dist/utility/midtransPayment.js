"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.core = void 0;
const midtransClient = require('midtrans-client');
exports.core = new midtransClient.CoreApi({
    isProduction: false,
    serverKey: process.env.MIDTRANS_SERVER_KEY,
    clientKey: process.env.MIDTRANS_CLIENT_KEY
});
//# sourceMappingURL=midtransPayment.js.map