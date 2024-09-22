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
    })
    btnAceptar.addEventListener('click', () => {
        updateExchange('accepted')
    })
}

async function updateExchange(state){
    const body = {
        id: exchangeId,
        state: state
    }
    const response = await fetch('https://localhost:3002/api/exchange/changeState', 
        {
        method:'PUT',
        headers: {'Authorization': `Bearer ${getCookie('token')}`,
                'Content-Type': 'application/json'},
        body: JSON.stringify(body)
    })
    if (!response.ok) {
        throw new Error('Network response was not ok');

    }else{
        window.open('../pages/catalogo.html', "_self")
    }
}
