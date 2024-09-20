import { chatSocket } from '../js/chatSocket.js';
import { getCookie } from './helpers.js';
const userId = getCookie('ID');
let receiverUserId;
let currentChatId;
let chats;
const formatter = new Intl.DateTimeFormat('en-US', { hour: '2-digit', minute: '2-digit' });
document.addEventListener('DOMContentLoaded', async () => {
    await renderChatsCard();
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
        let lastMessage = '';
        if (chat.message) {
            lastMessage = chat.messages[chat.messages.length - 1].content
        }
        chatCard.innerHTML = `
                    <img src="${receiverUserInfo.profilePictureUrl}" alt="" class="chat-pfp">
                        <div class="chat-info">
                            <h4 class="chat-name">${receiverUserInfo.username}</h4>
                            <p class="chat-lastMessage">${lastMessage}</p>
                        </div>
            `;
        chatContainer.append(chatCard);
        chatCard.addEventListener('click', () => {
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
    currentChatId = chatId;    
    const currentChatContainer = document.querySelector('.currentChat-messages');
    currentChatContainer.innerHTML = '';
    const currentChat = chats.find(chat => chat._id == chatId);
    if(currentChat.senderUserId == userId) 
        {
            receiverUserId = currentChat.receiverUserId;
        }
    else
    {
        receiverUserId = currentChat.senderUserId;
    }
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
    const input = document.querySelector('.currentChat-input');
    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendMessage(e.target.value);
            e.target.value = '';
        }
    })
}
function sendMessage(content) {
    const msg =
    {
        userId: userId,
        receiverUserId: receiverUserId,
        chatId: currentChatId,
        content: content
    };
    chatSocket.emit('msg', msg, msg.chatId);
}
function renderMessage(msg)
{
    const currentChatContainer = document.querySelector('.currentChat-messages');
    const messageContainer = document.createElement('div');
        messageContainer.classList.add('message');
        if (msg.userId == userId) {
            messageContainer.classList.add('sender')
        }
        else {
            messageContainer.classList.add('receiver');
        }
        const date = new Date(msg.createdAt)
        const formattedTime = formatter.format(date);
        messageContainer.innerHTML = `
            <p class="message-content">${msg.content}</p>
            <span class="message-time">${formattedTime}</span>
        `;
        currentChatContainer.append(messageContainer);
}
chatSocket.on('msg', (content) => {   
    renderMessage(content);
});