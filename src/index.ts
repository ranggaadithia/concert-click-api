import express, { Request, Response } from 'express';
import { organizerRouter } from './routes/organizerRoutes';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/organizer', organizerRouter());


app.listen(3000, () => console.log('Server running on http://localhost:3000'));