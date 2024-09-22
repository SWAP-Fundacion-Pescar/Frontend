import { chatSocket } from '../js/chatSocket.js';
import { getCookie } from './helpers.js';
const userId = getCookie('ID');
let receiverUserId;
let currentChatId = '';
let chats;
let order = -1;
let usersInfo = {};
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
        usersInfo[chat._id] = receiverUserInfo;
        const chatCard = document.createElement('div');
        chatCard.classList.add('chat');
        chatCard.classList.add(`id_${chat._id}`)
        let lastMessage = '';
        if (chat.messages.length > 0) {
            lastMessage = chat.messages[chat.messages.length - 1].content
        }
        const unreadMessagesCount = chat.messages.filter(message => message.isRead === false).length;
        chatCard.innerHTML = `
                    <div class="chat-pfp-container">
                        <img src="${receiverUserInfo.profilePictureUrl}" alt="" class="chat-pfp">
                    </div>
                    <div class="chat-info">
                        <h4 class="chat-name">${receiverUserInfo.username}</h4>
                        <p class="chat-lastMessage">${lastMessage}</p>
                    </div>
            `;
        const messageCounter = document.createElement('div');
        messageCounter.classList.add('message-counter');
        messageCounter.innerText = unreadMessagesCount;
        console.log(unreadMessagesCount);
        if (unreadMessagesCount > 0) { messageCounter.style.display = 'flex' };
        chatCard.append(messageCounter);
        chatContainer.append(chatCard);
        chatCard.addEventListener('click', () => {
            renderCurrentChatMessages(chat._id);
        })
    }
    renderCurrentChatMessages(chats[0]._id);
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
    const chatCard = document.querySelector(`.id_${chatId}`);
    const messageCounter = chatCard.lastElementChild;
    messageCounter.innerHTML = '';
    messageCounter.style.display = 'none';
    if (currentChat.senderUserId == userId) {
        receiverUserId = currentChat.receiverUserId;
    }
    else {
        receiverUserId = currentChat.senderUserId;
    }
    currentChat.messages.forEach(message => {
        renderMessage(message);        
    });
    const input = document.querySelector('.currentChat-input');
    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && e.target.value != '') {
            sendMessage(e.target.value);
            e.target.value = '';
        }
    })
    renderCurrentChatMessagesHeader(chatId)
    scrollToBottom()
}
function renderCurrentChatMessagesHeader(chatId) {    
    const currentPFP = document.querySelector('.currentChat-pfp');
    currentPFP.src = usersInfo[chatId].profilePictureUrl;
    const currentChatName = document.querySelector('.currentChat-name');
    currentChatName.innerText = usersInfo[chatId].username;
}
function sendMessage(content) {
    const msg =
    {
        userId: userId,
        receiverUserId: receiverUserId,
        chatId: currentChatId,
        content: content
    };
    const mediaInput = document.getElementById('mediaInput');
    if (mediaInput.files.length > 0) {
        const file = mediaInput.files[0];
        const reader = new FileReader();
        reader.onload = function (event) {
            const base64String = event.target.result.split(',')[1]; 
            msg.media = {
                filename: file.name,
                content: base64String,
                mimeType: file.type 
            };
            chatSocket.emit('msg', msg, msg.chatId);
        };
        reader.readAsDataURL(file);
    } else {        
        chatSocket.emit('msg', msg, msg.chatId);
    }
}
function renderMessage(msg) {
    const currentChatContainer = document.querySelector('.currentChat-messages');
    const messageContainer = document.createElement('div');
    messageContainer.classList.add('message');
    if (msg.userId == userId) {
        messageContainer.classList.add('sender')
    }
    else {
        messageContainer.classList.add('receiver');
        readMessage(msg)
    }
    const date = new Date(msg.createdAt)
    const formattedTime = formatter.format(date);
    if (msg.media) {
        messageContainer.innerHTML = `
            <img src=${msg.media.url} class="message-media">
            <p class="message-content">${msg.content}</p>
            <span class="message-time">${formattedTime}</span>
        `;        
    }
    else {
        messageContainer.innerHTML = `
        <p class="message-content">${msg.content}</p>
        <span class="message-time">${formattedTime}</span>
    `;
    }
    currentChatContainer.append(messageContainer);
    scrollToBottom();
}
function readMessage(msg) {
    const readRequest =
    {
        messageId: msg._id,
        chatId: currentChatId
    }
    chatSocket.emit('read', readRequest);
}
function isUserInTheSameChat(content) {
    const currentChat = chats.find(chat => chat._id == currentChatId);
    if (currentChat.receiverUserId == content.userId || currentChat.senderUserId == content.userId) {
        currentChat.messages.push(content);
        updateLastMessageContent(content, currentChatId);
        renderMessage(content);
    }
    else {
        const chat = chats.find(chat => chat.senderUserId == content.userId || chat.receiverUserId == content.userId);
        chat.messages.push(content);
        updateLastMessageContent(content, chat._id);
        const chatCard = document.querySelector(`.id_${chat._id}`);
        chatCard.style.order = --order;
        const messageCounter = chatCard.lastElementChild;
        let amount = 1;
        if (messageCounter.textContent) {
            amount = parseInt(messageCounter.textContent) + amount;
        }
        messageCounter.textContent = amount;
        messageCounter.style.display = 'flex';
    }
}
function updateLastMessageContent(msg, currentChatId) {
    const chatCard = document.querySelector(`.id_${currentChatId}`);
    const lastMessage = chatCard.querySelector('.chat-lastMessage');
    lastMessage.innerHTML = msg.content;
    chatCard.style.order = --order;
}
function scrollToBottom() {
    var container = document.querySelector('.currentChat-messages');
    container.scrollTop = container.scrollHeight;
}
chatSocket.on('msg', (content) => {
    console.log(content);
    isUserInTheSameChat(content);
});
