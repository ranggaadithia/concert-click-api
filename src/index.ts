import express, { Request, Response } from 'express';
import { organizerRouter } from './routes/organizerRoutes';
import { eventRouter } from './routes/eventRoutes';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req: Request, res: Response) => {
  res.send({
   status: 'success',
   message: 'API Endpoint for Concert Click'
  });
});

app.use('/organizer', organizerRouter());
app.use('/event', eventRouter());


app.listen(3000, () => console.log('Server running on http://localhost:3000'));