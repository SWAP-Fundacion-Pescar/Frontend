import { addEventToSearchBar } from "./helpers.js";
const catalogContainer = document.getElementById('catalogo');
const heart = `<svg width="40" height="40" viewBox="0 0 41 41" fill="none" xmlns="http://www.w3.org/2000/svg">
<mask id="mask0_384_1259" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="50" height="50">
<rect width="50" height="50" fill="#D9D9D9"/>
</mask>
<g mask="url(#mask0_384_1259)">
<path d="M19.9919 35.7942L17.5599 33.6023C14.7366 31.0452 12.4025 28.8393 10.5576 26.9846C8.71261 25.13 7.24505 23.4651 6.15486 21.9898C5.06467 20.5145 4.30293 19.1586 3.86965 17.9222C3.43637 16.6858 3.21973 15.4213 3.21973 14.1286C3.21973 11.4872 4.10027 9.2813 5.86134 7.51097C7.62242 5.74064 9.81678 4.85547 12.4444 4.85547C13.898 4.85547 15.2817 5.16457 16.5955 5.78279C17.9094 6.401 19.0415 7.27212 19.9919 8.39614C20.9423 7.27212 22.0744 6.401 23.3883 5.78279C24.7021 5.16457 26.0858 4.85547 27.5394 4.85547C30.167 4.85547 32.3614 5.74064 34.1225 7.51097C35.8835 9.2813 36.7641 11.4872 36.7641 14.1286C36.7641 15.4213 36.5474 16.6858 36.1142 17.9222C35.6809 19.1586 34.9191 20.5145 33.8289 21.9898C32.7388 23.4651 31.2712 25.13 29.4262 26.9846C27.5813 28.8393 25.2472 31.0452 22.4239 33.6023L19.9919 35.7942ZM19.9919 31.2419C22.6754 28.8252 24.8838 26.7528 26.6169 25.0246C28.35 23.2964 29.7198 21.7931 30.7261 20.5145C31.7324 19.2359 32.4313 18.0978 32.8226 17.1003C33.214 16.1027 33.4096 15.1122 33.4096 14.1286C33.4096 12.4426 32.8506 11.0376 31.7324 9.91357C30.6143 8.78954 29.2166 8.22753 27.5394 8.22753C26.2256 8.22753 25.0096 8.59987 23.8914 9.34453C22.7733 10.0892 22.0046 11.0376 21.5853 12.1897H18.3985C17.9792 11.0376 17.2105 10.0892 16.0924 9.34453C14.9742 8.59987 13.7582 8.22753 12.4444 8.22753C10.7672 8.22753 9.36952 8.78954 8.25138 9.91357C7.13323 11.0376 6.57416 12.4426 6.57416 14.1286C6.57416 15.1122 6.76984 16.1027 7.16119 17.1003C7.55254 18.0978 8.25138 19.2359 9.25771 20.5145C10.264 21.7931 11.6338 23.2964 13.3669 25.0246C15.1 26.7528 17.3084 28.8252 19.9919 31.2419Z" fill="#727A4B"/>
</g>
</svg>
`
document.addEventListener('DOMContentLoaded', () => {
    addEventToSearchBar();
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
    clotheContainer.className = 'card';
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
        <div class="card-img">
            <img src="${clothe.media[0].url}" alt="${clothe.name}" class="card__img">
        </div>
        <div class="card-content">
            <h3>${clothe.name}</h3>
            <p>${userInfo.city}</p> 
        </div>
        <div class="card-bottom">
            ${heart}
            <a href="../pages/detalleprenda.html?id=${clothe._id}" class="swap__card__button button">Intercambiar</a>                 
        </div>
    `;
    catalogContainer.appendChild(clotheContainer);
}

function getQueryParams() {
    const currentUrl = window.location.href;
    const url = new URL(currentUrl);
    const params = new URLSearchParams(url.search);
    return Object.fromEntries(params.entries());
}

function handleUrl() {
    let baseClotheUrl = "https://microservicio-prendas.vercel.app/api/clothes?"
    const { category, page, search } = getQueryParams();
    if (category != null && category != "") {
        baseClotheUrl += `&category=${category}`;
    }
    if (page != null && page != "") {
        const offset = ((Number(page) - 1) * 12);
        baseClotheUrl += `&offset=${offset}`;
    }
    if (search != null && search != "") {
        baseClotheUrl += `&name=${search}`;
    }
    return baseClotheUrl;
}