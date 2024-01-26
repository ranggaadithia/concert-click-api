import express, { Request, Response } from 'express';
import { organizerRouter } from './routes/organizerRoutes';
import { eventRouter } from './routes/eventRoutes';
import { ticketRouter } from './routes/ticketRoutes';
import { purchaserRouter } from './routes/purchaserRoutes';
import { ticketPurchaseRoutes } from './routes/ticketPurchaseRoutes';
import { paymentNotificationRoutes } from './routes/paymentNotifRoutes';
import { homePageRoutes } from './routes/homePageRoutes';

const app = express();

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
app.use('/buyer', purchaserRouter());
app.use('/buy', ticketPurchaseRoutes());
app.use('/notification', paymentNotificationRoutes());
app.use('/homepage', homePageRoutes());








app.listen(3000, () => console.log('Server running on http://localhost:3000'));