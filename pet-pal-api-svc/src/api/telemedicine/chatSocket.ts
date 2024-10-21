import { type Server, type Socket } from 'socket.io';
import { socketMiddleware } from '../../middleware.js';
import { client, generatePrompt, model } from '../../utils/gpt-config.js';
import { OPENAI_API_URL } from '../../constants/secrets.js';

const handleChatSocketConnection = (io: Server) => {
	io.use(socketMiddleware);
	io.on('connection', (socket: Socket) => {
		socket.on('user-event', async (messageContext: []) => {
			const gptResponse = await client.post(OPENAI_API_URL, {
				model,
				messages: generatePrompt({}, messageContext),
			});
			socket.emit('bot-event', gptResponse);
		});
		socket.on('disconnect', () => {
			// TODO: save chats to database on disconnect;
			console.log('session disconnected:', socket.id);
		});
	});
};

export default handleChatSocketConnection;
