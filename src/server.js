import app from './app.js';
import { Server } from 'socket.io';
import { createServer } from 'node:http';
const server = createServer(app);
const io = new Server(server);

const PORT = process.env.PORT || 3005;

//Inicia el servidor en el puerto 3005
server.listen(PORT, () => {
    console.log(`El servidor esta corriendo en el puerto ${PORT}`);
});
