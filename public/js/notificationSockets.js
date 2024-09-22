import { getCookie } from "./helpers.js";
const socketUrl = 'http://localhost:3004';
const notificationSocket = io(socketUrl, {
    extraHeaders: {
        authorization: `bearer ${getCookie('token')}`
    }
});
document.addEventListener('DOMContentLoaded', () => {
    const userId = getCookie('ID');
    notificationSocket.emit('join', userId)
    notificationSocket.emit('getNotificationsChat', userId);
    notificationSocket.emit('getNotificationsExchange', userId);
})
notificationSocket.on('connect', () => {
    console.log('Connected to the Socket.IO server.');
});
notificationSocket.on('notificationsChat', (content) => {
    //TODO Actualizar icono de chats en base a la cantidad de mensajes y rellenar un div invisible con el contenido
    console.log(content)
})
notificationSocket.on('notificationsExchange', (content) => 
    {
        //TODO Actualizar icono de notificaciones en base a la cantidad y rellenar un div invisible con el contenido
        console.log(content);
    })
export {
    notificationSocket
}