document.addEventListener('DOMContentLoaded', ()=>{
    const url = handleUrl()
    renderCard(url);
    addEventListener()
})
let exchangeId

function getQueryParams() {
    const currentUrl = window.location.href;
    const url = new URL(currentUrl);
    const params = new URLSearchParams(url.search);
    return Object.fromEntries(params.entries()); //crear objetos a traves de parametros
}

function handleUrl() {
    let baseClotheUrl = 'https://microservicio-prendas.vercel.app/api/clothes';
    const params = getQueryParams();
    const id = params.id
    exchangeId = params.exchangeId
    baseClotheUrl += `/${id}`;
    return baseClotheUrl;
}

function getCookie(name) {
    let value = (`; ${document.cookie}`);
    let parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}

function addEventListener() {

    const btnRechazar = document.getElementById('rechazar-intercambio-btn')
    const btnAceptar = document.getElementById('aceptar-intercambio-btn')
    btnRechazar.addEventListener('click', () => {
        updateExchange('rejected')
        window.open('../pages/catalogo.html', '_self')
    })
    btnAceptar.addEventListener('click', () => {
        updateExchange('ongoing')
        window.open('../pages/chat.html', '_self')
    })
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
}


async function updateExchange(state){
    const body = {
        id: exchangeId,
        state: state
    }
    const response = await fetch('https://microservicio-intercambios.vercel.app/api/exchange/changeState', 
        {
        method:'PUT',
        headers: {'Authorization': `Bearer ${getCookie('token')}`,
                'Content-Type': 'application/json'},
        body: JSON.stringify(body)
    })
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
}
