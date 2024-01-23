import express, { Request, Response } from 'express';
import { organizerRouter } from './routes/organizerRoutes';
import { eventRouter } from './routes/eventRoutes';
import { ticketRouter } from './routes/ticketRoutes';
import { purchaserRouter } from './routes/purchaserRoutes';
import { ticketPurchaseRoutes } from './routes/ticketPurchaseRoutes';
const midtransClient = require('midtrans-client');

const app = express();
// Create Core API / Snap instance (both have shared `transactions` methods)
let apiClient = new midtransClient.Snap({
        isProduction : false,
        serverKey : 'YOUR_SERVER_KEY',
        clientKey : 'YOUR_CLIENT_KEY'
    });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req: Request, res: Response) => {
  res.send({
   status: 'success',
   message: 'API Endpoint for Concert Click!',
   documentation: 'https://documenter.getpostman.com/view/28563924/2s9YsNeAuL'
  });
});

app.use(express.static('banners'))
app.use('/organizer', organizerRouter());
app.use('/event', eventRouter());
app.use('/ticket', ticketRouter());
app.use('/purchaser', purchaserRouter());
app.use('/buy', ticketPurchaseRoutes());
app.get('/test', (req: Request, res: Response) => {
  console.log('test application success to running');
  res.send('test');
});

app.post('/notification', (req: Request, res: Response, notificationJson) => {
  apiClient.transaction.notification(notificationJson)
    .then((statusResponse: { order_id: any; transaction_status: any; fraud_status: any; })=>{
        let orderId = statusResponse.order_id;
        let transactionStatus = statusResponse.transaction_status;
        let fraudStatus = statusResponse.fraud_status;

        console.log(`Transaction notification received. Order ID: ${orderId}. Transaction status: ${transactionStatus}. Fraud status: ${fraudStatus}`);
    });
});


app.listen(3000, () => console.log('Server running on http://localhost:3000'));