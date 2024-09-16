const catalogContainer = document.getElementById('catalogo');
const baseClotheUrl = 'https://microservicio-prendas.vercel.app/api/clothes';
let currentPage = 1;

document.addEventListener('DOMContentLoaded', () => {
    const url = handleUrl();
    renderCards(url);
    getQueryParams();
});
async function renderCards(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const clothes = await response.json();
        catalogContainer.innerHTML = '';
        clothes.forEach(async clothe => {
            createCard(clothe)
        });
    } catch (error) {
        console.error('Error al cargar las prendas:', error);
        catalogContainer.innerHTML = '<p>No se pudieron cargar las prendas. Inténtalo de nuevo más tarde.</p>';
    }
}

async function createCard(clothe) {
    const clotheContainer = document.createElement('div');
    clotheContainer.className = 'prenda';
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
    console.log(userInfo)
    clotheContainer.innerHTML = `
        <div class="prenda-img"><img src="${clothe.media[0].url}" alt="${clothe.name}" class="prenda__img"></div>
        <p>${clothe.name}</p>
        <p>${userInfo.city}</p>                                            
        <a href="../pages/detalleprenda.html?id=${clothe._id}" class="swap__card__button button">Intercambiar</a>                 
    `;
    catalogContainer.appendChild(clotheContainer);
}

function getQueryParams() {
    const currentUrl = window.location.href;
    const url = new URL(currentUrl);
    const params = new URLSearchParams(url.search);
    return Object.fromEntries(params.entries());
}

function handleUrl()
{
    let baseClotheUrl = "https://microservicio-prendas.vercel.app/api/clothes?"
    const { category, page, search} = getQueryParams();
    if (category != null && category != "") {
        baseClotheUrl += `&category=${category}`;
    }
    if (page != null && page != "") {
        const offset = ((Number(page) - 1) * 12);
        baseClotheUrl += `&offset=${offset}`;
    }
    if (search != null && search != "") {
        baseClotheUrl += `&search=${search}`;
    }
    return baseClotheUrl;
}