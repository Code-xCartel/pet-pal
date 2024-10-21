import express from 'express';
import * as http from 'node:http';
import { Server } from 'socket.io';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import 'dotenv/config';
import { ATLAS_CONNECTION_STRING } from './constants/secrets.js';
import { authMiddleware } from './middleware.js';
import handleChatSocketConnection from './api/telemedicine/chatSocket.js';
import allRoutes from './api/api.js';

mongoose
	.connect(ATLAS_CONNECTION_STRING)
	.then(() => console.log('db-svc-connected'));
const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: '*' } });
handleChatSocketConnection(io);

app.use(cors());
app.use('/payments/webhook', express.raw({ type: 'application/json' }));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(authMiddleware);
app.use(allRoutes);

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log('api-svc started'));
