import { addEventToSearchBar } from "./helpers.js";
document.addEventListener('DOMContentLoaded', function () {
    addEventToSearchBar();
    const url = handleUrl();
    renderTotal(url)
});

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
async function renderCard(url) {
    const preloader = document.getElementById('preloader')
    if(preloader) preloader.style.display = 'flex';

    const response = await fetch(url);
    if (!response.ok) {
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
    finally {
        if(preloader) preloader.style.display = 'none';
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
    return clothe.category
}
async function renderTotal(initialUrl) {
    try {
        const category = await renderCard(initialUrl);

        const baseUrl = `https://microservicio-prendas.vercel.app/api/clothes`
        const params = new URLSearchParams();
        params.append('category', category)
        const stringParams = params.toString()
        console.log(stringParams)
        const relatedClothesUrl = `${baseUrl}?${stringParams}`
        
        getRelatedClothes(relatedClothesUrl)
        
    } catch (error) {
        console.error('Error en renderCard:', error);
    }
}

function getRelatedClothes(relatedClothesUrl) {
    const preloader = document.getElementById('preloader-prendasRelacionadas')
    if(preloader) preloader.style.display = 'flex';
    
    fetch(relatedClothesUrl)
        .then(response => response.json())
        .then(prendas => {
            console.log(relatedClothesUrl)
            console.log(prendas)
            const carrusel = document.getElementById('carrusel-items');
            carrusel.innerHTML = '';

            prendas.forEach(prenda => {
                const itemDiv = document.createElement('div');
                itemDiv.classList.add('carrusel-item');
                itemDiv.classList.add('card');

                itemDiv.innerHTML = `
                    <div class="card-img">
                        <img src="${prenda.media[0].url}" alt="${prenda.name}" class="card__img">
                    </div>
                    <div class="card-content">
                        <h3>${prenda.name}</h3>
                    </div>
                    <div class="card-bottom">
                        <a href="../pages/detalleprenda.html?id=${prenda._id}" class="swap__card__button button" id="detalle_prenda_btn">Intercambiar</a>      
                    </div>
                `;
                carrusel.appendChild(itemDiv);
            });
        })
        .catch(error => console.error('Error al cargar prendas relacionadas:', error))
        .finally(()=>{if(preloader) preloader.style.display = 'none'})
}
