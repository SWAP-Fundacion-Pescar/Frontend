import { addEventToSearchBar } from "./helpers.js";
document.addEventListener('DOMContentLoaded', function () {
    addEventToSearchBar();
    const url = handleUrl();
    renderCard(url);
});

async function renderCard(url) {
    const response = await fetch(url);
    if (!response) {
        throw new Error('Network response was not ok');

    }
    const clothe = await response.json()
    let userInfo;
    try {
        const response = await fetch(`https://microservicio-usuarios-three.vercel.app/api/users/${clothe.userId}`)
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        userInfo = await response.json();
    }
    catch (error) {
        console.error('Error al cargar informacion del usuario: ', error);
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

function irADetalle(prendaId) {
    window.location.href = `detalle.html?id=${prendaId}`;
}

function getQueryParams() {
    const currentUrl = window.location.href;
    const url = new URL(currentUrl);
    const params = new URLSearchParams(url.search);
    return Object.fromEntries(params.entries());
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