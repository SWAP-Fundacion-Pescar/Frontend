import { getCookie } from "./helpers.js";
const socketUrl = 'http://localhost:3003';
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
    const response = await fetch(`http://localhost:3003/api/chats/${getCookie('ID')}`);
    if (!response.ok) console.error('Error:', response.status);
    const chats = await response.json();
    return chats;
}
export {
    chatSocket
}
