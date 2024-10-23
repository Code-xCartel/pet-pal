import { Router } from 'express';
import authApi from './auth/auth.js';
import petsApi from './pets/_api.js';
import paymentsApi from './payments/_api.js';
import telemedicineApi from './telemedicine/_api.js';
import shopApi from './products/_api.js';
import groomerApi from './groomer/groomer.js';

const app = Router();

app.use('/auth', authApi);
app.use('/pets', petsApi);
app.use('/payments', paymentsApi);
app.use('/telemedicine', telemedicineApi);
app.use('/shop', shopApi);
app.use('/groomer', groomerApi);

/* gold ----------------------
  /boarding/live-monitoring
  /boarding/activity-tracking
  /telemedicine/doctors X

  plus -----------------------
  /telemedicine/chat X
  /ethical-matcher
  /play-date
  /grooming X

  basic ----------------------
  /pets/adoption X
  /pets/my-pets X
  /products X
*/

export default app;
