import { chatSocket } from '../js/chatSocket.js';
import { getCookie } from './helpers.js';
const userId = getCookie('ID');
document.addEventListener('DOMContentLoaded', () => {
    renderChatsCard();
    
});

async function retrieveUserChats() {
    const response = await fetch(`http://localhost:3003/api/chats/${userId}`);
    if (!response.ok) console.error('Error: ', response.status);
    const chats = await response.json();
    return chats;
}
async function renderChatsCard() {
    const chats = await retrieveUserChats();
    const chatContainer = document.querySelector('.chats');
    for(const chat of chats)
        {
            let receiverUserId;
            if (chat.senderUserId == userId) {
                receiverUserId = chat.receiverUserId;
            }
            else {
                receiverUserId = chat.senderUserId;
            }
            const receiverUserInfo = await retrieveUserInfo(receiverUserId);
            const chatCard = document.createElement('div');
            chatCard.classList.add('chat');
            chatCard.classList.add(`${chat._id}`)
            chatCard.innerHTML = `
                    <img src="${receiverUserId.profilePictureUrl}" alt="" class="chat-pfp">
                        <div class="chat-info">
                            <h4 class="chat-name">${receiverUserInfo.username}</h4>
                            <p class="chat-lastMessage">${chat.messages[chat.messages.length - 1].content}</p>
                        </div>
            `;
            chatContainer.append(chatCard);
        }
}
async function retrieveUserInfo(id) {
    const response = await fetch(`http://localhost:3000/api/users/${id}`);
    if (!response.ok) console.error('Error: ', response.status);
    const userInfo = await response.json();
    return userInfo;
}