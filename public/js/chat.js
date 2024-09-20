import { chatSocket } from '../js/chatSocket.js';
import { getCookie } from './helpers.js';
const userId = getCookie('ID');
let chats;
document.addEventListener('DOMContentLoaded', async () => {
    await renderChatsCard();
    // renderCurrentChatMessages();
});

async function retrieveUserChats() {
    const response = await fetch(`http://localhost:3003/api/chats/${userId}`);
    if (!response.ok) console.error('Error: ', response.status);
    const chats = await response.json();
    return chats;
}
async function renderChatsCard() {
    chats = await retrieveUserChats();
    const chatContainer = document.querySelector('.chats');
    for (const chat of chats) {
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
        chatCard.addEventListener('click', () => 
            {
                renderCurrentChatMessages(chat._id);
            })
    }
}
async function retrieveUserInfo(id) {
    const response = await fetch(`http://localhost:3000/api/users/${id}`);
    if (!response.ok) console.error('Error: ', response.status);
    const userInfo = await response.json();
    return userInfo;
}

function renderCurrentChatMessages(chatId) {
    const currentChatContainer = document.querySelector('.currentChat-messages');
    currentChatContainer.innerHTML = '';
    const currentChat = chats.find(chat => chat._id == chatId);
    const formatter = new Intl.DateTimeFormat('en-US', { hour: '2-digit', minute: '2-digit' });
    currentChat.messages.forEach(message => {
        const messageContainer = document.createElement('div');
        messageContainer.classList.add('message');
        if (message.userId == userId) {
            messageContainer.classList.add('sender')
        }
        else {
            messageContainer.classList.add('receiver');
        }
        const date = new Date(message.createdAt)
        const formattedTime = formatter.format(date);
        messageContainer.innerHTML = `
            <p class="message-content">${message.content}</p>
            <span class="message-time">${formattedTime}</span>
        `;
        currentChatContainer.append(messageContainer);
    });
}