import { addEventToSearchBar, getQueryParams, getCookie } from "./helpers.js";
document.addEventListener('DOMContentLoaded', function () {
    addEventToSearchBar();
    const url = handleUrl();  
    renderCard(url);  
});
let clothe;
async function retrieveClothe(url) {
    try
    {
        const response = await fetch(url);
        if (!response) {
            throw new Error('Network response was not ok');
        }
        clothe = await response.json();
    }
    catch (error)
    {
        console.error('Error al obtener informacion de la prenda: ', error)
    }
}
async function retrieveUserInfo(userId)
{
    try {
        const response = await fetch(`https://microservicio-usuarios-three.vercel.app/api/users/${userId}`)
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const userInfo = await response.json();
        return userInfo;
    }
    catch (error) {
        console.error('Error al cargar informacion del usuario: ', error);
    }
}
async function renderCard(url) {
    await retrieveClothe(url);
    const userInfo = await retrieveUserInfo(clothe.userId);
    if(userInfo.id == getCookie('ID'))
        {
            //TODO: Cambiar vista porque el usuario es el due;o de la prenda;
        }
    document.getElementById('prenda-imagen').src = clothe.media[0].url;
    document.getElementById('prenda-nombre').textContent = clothe.name;
    document.getElementById('prenda-lugar').textContent = userInfo.city;
    document.getElementById('prenda-color').textContent = clothe.color;
    document.getElementById('prenda-talle').textContent = clothe.size;
    document.getElementById('prenda-categoria').textContent = clothe.category;
    document.getElementById('prenda-descripcion').textContent = clothe.description;
    document.getElementById('intercambio-color').textContent = clothe.expectedColor;
    document.getElementById('intercambio-talle').textContent = clothe.expectedSize;
    document.getElementById('intercambio-categoria').textContent = clothe.expectedCategory;
    console.log(clothe)
    sendExchangeRequest('Test');
}
function handleUrl() {
    let baseClotheUrl = 'https://microservicio-prendas.vercel.app/api/clothes';
    const { id } = getQueryParams();
    baseClotheUrl += `/${id}`;
    return baseClotheUrl;
}

async function sendExchangeRequest(senderClotheId)
{
    const userId = getCookie('ID');
    const body = 
    {
        senderUserId: userId,
        senderClotheId: senderClotheId,
        receiverUserId: clothe.userId,
        receiverClotheId: clothe.id
    };
    const response = await fetch('http://localhost:3002/api/exchange', 
        {
            method: 'POST',
            headers:
            {
                'Authorization': `Bearer ${getCookie('token')}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });
    if(!response.ok) console.error('Error', response.status);
    //TODO Mostrar algun tipo de confirmacion de que la solicitud fue enviada correctamente 
    const exchange = await response.json();
    console.log(exchange);   
}

async function updateClotheDetails()
{
    let body = {}
    const updatedName = document.getElementById('updatedName').value;
    const updatedCategory = document.getElementById('updatedCategory').value;
    const updatedExpectedCategory = document.getElementById('updatedExpectedCategory').value;
    const updatedSize = document.getElementById('updatedSize').value;
    const updatedExpectedSize = document.getElementById('updatedExpectedSize').value;
    const updatedGender = document.getElementById('updatedGender').value;
    const updatedExpectedGender = document.getElementById('updatedExpectedGender').value;
    const updatedDescription = document.getElementById('updatedDescription').value;
    const updatedColor= document.getElementById('updatedColor').value;
    const updatedExpectedColor = document.getElementById('updatedExpectedColor').value;
    if(updatedName) body.updatedName = updatedName;
    if(updatedCategory) body.updatedCategory = updatedCategory;
    if(updatedExpectedCategory) body.updatedExpectedCategory = updatedExpectedCategory;
    if(updatedSize) body.updatedSize = updatedSize;
    if(updatedExpectedSize) body.updatedExpectedSize = updatedExpectedSize;
    if(updatedGender) body.updatedGender = updatedGender;
    if(updatedExpectedGender) body.updatedExpectedGender = updatedExpectedGender;
    if(updatedDescription) body.updatedDescription = updatedDescription;
    if(updatedColor) body.updatedColor = updatedColor;
    if(updatedExpectedColor) body.updatedExpectedColor = updatedExpectedColor;
    const response = await fetch('https://microservicio-prendas.vercel.app/api/clothes/update', 
        {
            method: 'PUT',
            headers:
            {
                'Authorization': `Bearer ${getCookie('token')}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        })
    if(!response.ok) console.error('Error: ', response.status);
    window.location.reload();
}
function cargarPrendasRelacionadas(category) {
    fetch(`${apiUrl}?categoria=${category}`)
        .then(response => response.json())
        .then(prendas => {
            const carrusel = document.getElementById('carrusel-items');
            carrusel.innerHTML = '';

            prendas.forEach(prenda => {
                const itemDiv = document.createElement('div');
                itemDiv.classList.add('carrusel-item');

                itemDiv.innerHTML = `
                    <img src="${prenda.media[0].url}" alt="${prenda.name}">
                    <h3>${prenda.name}</h3>
                    <button onclick="irADetalle('${prenda._id}')">Intercambiar</button>
                `;

                carrusel.appendChild(itemDiv);
            });
        })
        .catch(error => console.error('Error al cargar prendas relacionadas:', error));
}