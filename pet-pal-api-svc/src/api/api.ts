import { Router } from 'express';
import authApi from './auth/auth.js';
import petsApi from './pets/_api.js';
import paymentsApi from './payments/_api.js';
import telemedicineApi from './telemedicine/_api.js';

const app = Router();

app.use('/auth', authApi);
app.use('/pets', petsApi);
app.use('/payments', paymentsApi);
app.use('/telemedicine', telemedicineApi);

/* gold ----------------------
  /boarding/live-monitoring
  /boarding/activity-tracking
  /telemedicine/doctors

  plus -----------------------
  /telemedicine/chat
  /ethical-matcher
  /play-date

  basic ----------------------
  /adoption
  /products
  /grooming
*/

export default app;
