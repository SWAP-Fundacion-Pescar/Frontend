import { getCookie } from "./helpers.js";
const socketUrl = 'https://microservicio-chats.onrender.com';
const chatSocket = io(socketUrl, {
    extraHeaders: {
        authorization: `bearer ${getCookie('token')}`
    }
});
document.addEventListener('DOMContentLoaded', async () => {
    const chats = await retrieveChats();
    console.log(chats);
    chats.forEach(chat => {
        chatSocket.emit('join', chat._id);
    });
});
async function retrieveChats() {
    const response = await fetch(`https://microservicio-chats.onrender.com/api/chats/${getCookie('ID')}`);
    if (!response.ok) console.error('Error:', response.status);
    const chats = await response.json();
    return chats;
}
export {
    chatSocket
}
