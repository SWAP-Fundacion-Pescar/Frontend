import { addEventToSearchBar, getQueryParams, getCookie } from "./helpers.js";
document.addEventListener('DOMContentLoaded', function () {
    addEventToSearchBar();
    const url = handleUrl();  
    renderCard(url);  
});
async function retrieveClothe(url) {
    try
    {
        const response = await fetch(url);
        if (!response) {
            throw new Error('Network response was not ok');
        }
        const clothe = await response.json();
        return clothe;
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
    const clothe = await retrieveClothe(url);
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
}
function handleUrl() {
    let baseClotheUrl = 'https://microservicio-prendas.vercel.app/api/clothes';
    const { id } = getQueryParams();
    baseClotheUrl += `/${id}`;
    return baseClotheUrl;
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