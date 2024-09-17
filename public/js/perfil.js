import { addEventToSearchBar } from "./helpers.js";
const threeDotsSVG = `<svg width="25" height="26" viewBox="0 0 25 26" fill="none" xmlns="http://www.w3.org/2000/svg">
<mask id="mask0_384_1261" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="25" height="26">
<rect x="0.410156" y="0.901367" width="24.15" height="24.2769" fill="#D9D9D9"/>
</mask>
<g mask="url(#mask0_384_1261)">
<path d="M12.4852 21.1319C11.9317 21.1319 11.4579 20.9338 11.0638 20.5376C10.6697 20.1414 10.4727 19.6651 10.4727 19.1088C10.4727 18.5525 10.6697 18.0762 11.0638 17.68C11.4579 17.2838 11.9317 17.0857 12.4852 17.0857C13.0386 17.0857 13.5124 17.2838 13.9065 17.68C14.3006 18.0762 14.4977 18.5525 14.4977 19.1088C14.4977 19.6651 14.3006 20.1414 13.9065 20.5376C13.5124 20.9338 13.0386 21.1319 12.4852 21.1319ZM12.4852 15.0626C11.9317 15.0626 11.4579 14.8646 11.0638 14.4684C10.6697 14.0722 10.4727 13.5959 10.4727 13.0396C10.4727 12.4832 10.6697 12.007 11.0638 11.6108C11.4579 11.2146 11.9317 11.0165 12.4852 11.0165C13.0386 11.0165 13.5124 11.2146 13.9065 11.6108C14.3006 12.007 14.4977 12.4832 14.4977 13.0396C14.4977 13.5959 14.3006 14.0722 13.9065 14.4684C13.5124 14.8646 13.0386 15.0626 12.4852 15.0626ZM12.4852 8.99342C11.9317 8.99342 11.4579 8.79533 11.0638 8.39914C10.6697 8.00295 10.4727 7.52669 10.4727 6.97034C10.4727 6.414 10.6697 5.93773 11.0638 5.54154C11.4579 5.14536 11.9317 4.94727 12.4852 4.94727C13.0386 4.94727 13.5124 5.14536 13.9065 5.54154C14.3006 5.93773 14.4977 6.414 14.4977 6.97034C14.4977 7.52669 14.3006 8.00295 13.9065 8.39914C13.5124 8.79533 13.0386 8.99342 12.4852 8.99342Z" fill="#727A4B"/>
</g>
</svg>
`;
const heart = `<svg width="40" height="40" viewBox="0 0 41 41" fill="none" xmlns="http://www.w3.org/2000/svg">
<mask id="mask0_384_1259" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="50" height="50">
<rect width="50" height="50" fill="#D9D9D9"/>
</mask>
<g mask="url(#mask0_384_1259)">
<path d="M19.9919 35.7942L17.5599 33.6023C14.7366 31.0452 12.4025 28.8393 10.5576 26.9846C8.71261 25.13 7.24505 23.4651 6.15486 21.9898C5.06467 20.5145 4.30293 19.1586 3.86965 17.9222C3.43637 16.6858 3.21973 15.4213 3.21973 14.1286C3.21973 11.4872 4.10027 9.2813 5.86134 7.51097C7.62242 5.74064 9.81678 4.85547 12.4444 4.85547C13.898 4.85547 15.2817 5.16457 16.5955 5.78279C17.9094 6.401 19.0415 7.27212 19.9919 8.39614C20.9423 7.27212 22.0744 6.401 23.3883 5.78279C24.7021 5.16457 26.0858 4.85547 27.5394 4.85547C30.167 4.85547 32.3614 5.74064 34.1225 7.51097C35.8835 9.2813 36.7641 11.4872 36.7641 14.1286C36.7641 15.4213 36.5474 16.6858 36.1142 17.9222C35.6809 19.1586 34.9191 20.5145 33.8289 21.9898C32.7388 23.4651 31.2712 25.13 29.4262 26.9846C27.5813 28.8393 25.2472 31.0452 22.4239 33.6023L19.9919 35.7942ZM19.9919 31.2419C22.6754 28.8252 24.8838 26.7528 26.6169 25.0246C28.35 23.2964 29.7198 21.7931 30.7261 20.5145C31.7324 19.2359 32.4313 18.0978 32.8226 17.1003C33.214 16.1027 33.4096 15.1122 33.4096 14.1286C33.4096 12.4426 32.8506 11.0376 31.7324 9.91357C30.6143 8.78954 29.2166 8.22753 27.5394 8.22753C26.2256 8.22753 25.0096 8.59987 23.8914 9.34453C22.7733 10.0892 22.0046 11.0376 21.5853 12.1897H18.3985C17.9792 11.0376 17.2105 10.0892 16.0924 9.34453C14.9742 8.59987 13.7582 8.22753 12.4444 8.22753C10.7672 8.22753 9.36952 8.78954 8.25138 9.91357C7.13323 11.0376 6.57416 12.4426 6.57416 14.1286C6.57416 15.1122 6.76984 16.1027 7.16119 17.1003C7.55254 18.0978 8.25138 19.2359 9.25771 20.5145C10.264 21.7931 11.6338 23.2964 13.3669 25.0246C15.1 26.7528 17.3084 28.8252 19.9919 31.2419Z" fill="#727A4B"/>
</g>
</svg>
`
addEventToSearchBar()
addEventListeners();
const apiUrl = 'https://microservicio-usuarios-three.vercel.app/api/users';
const usuarioId = '66e8e9faa5db0b49c0a600e3';
const clotheUrl = `https://microservicio-prendas.vercel.app/api/clothes/users`
// carga los datos del usuario
fetch(`${apiUrl}/${usuarioId}`)
    .then(response => response.json())
    .then(async usuario => {
        //  datos al HTML
        document.getElementById('foto-perfil').src = usuario.media;
        document.getElementById('nombre-usuario').innerText = usuario.name + " " + usuario.lastName;
        document.getElementById('ubicacion-usuario').innerText = usuario.city;
        document.getElementById('foto-perfil').src = usuario.profilePictureUrl;
        // carga publicaciones
        const response = await fetch(`${clotheUrl}/${usuarioId}`)
        if (!response) throw new Error('Error al obtener prendas');
        const clothes = await response.json();
        console.log(clothes)
        const publicacionesContainer = document.getElementById('publicaciones-container');
        clothes.forEach(clothe => {
            const publicacionDiv = document.createElement('div');
            publicacionDiv.classList.add('card');
            publicacionDiv.innerHTML = `
        <div class="dots-container">
            ${threeDotsSVG}
        </div>
        <div class="card-img">
            <img src="${clothe.media[0].url}" alt="${clothe.name}" class="card__img">
        </div>
        <div class="card-content">
            <h3>${clothe.name}</h3>
            <p>${usuario.city}</p> 
        </div>
        <div class="card-bottom">
            ${heart}
            <a href="../pages/detalleprenda.html?id=${clothe.id}" class="swap__card__button button">Intercambiar</a>                 
        </div>
    `;
            publicacionesContainer.appendChild(publicacionDiv);
        });

        // carga favoritos 
    })
    .catch(error => console.error('Error al cargar el perfil:', error));

// para alternar entre las secciones (publicaciones, favoritos, reseñas)
function mostrarSeccion(seccionId) {
    const secciones = document.querySelectorAll('.tab-content');
    secciones.forEach(seccion => seccion.classList.add('hidden'));

    document.getElementById(seccionId).classList.remove('hidden');
}
function addEventListeners() {
    document.getElementById('add-clothe-btn').addEventListener('click', () => {
        document.querySelector('.modal').style.display = 'flex';
    })
    document.getElementById('add-btn').addEventListener('click', () => {
        addClothe();
    })
    window.onclick = function (event) {
        if (event.target === document.querySelector('.modal')) {
            document.querySelector('.modal').style.display = 'none';
        }
    }
}
async function addClothe() {
    const name = document.getElementById('name').value;
    const category = document.getElementById('category').value;
    const expectedCategory = document.getElementById('expectedCategory').value;
    const size = document.getElementById('size').value;
    const expectedSize = document.getElementById('expectedSize').value;
    const gender = document.getElementById('gender').value;
    const expectedGender = document.getElementById('expectedGender').value;
    const description = document.getElementById('description').value;
    const color = document.getElementById('color').value;
    const expectedColor = document.getElementById('expectedColor').value;
    const media = document.getElementById('file').files[0];
    const formData = new FormData();
    formData.append('name', name);
    formData.append('category', category);
    formData.append('expectedCategory', expectedCategory);
    formData.append('size', size);
    formData.append('expectedSize', expectedSize);
    formData.append('gender', gender);
    formData.append('expectedGender', expectedGender);
    formData.append('description', description);
    formData.append('color', color);
    formData.append('expectedColor', expectedColor);
    formData.append('media', media);
    try {
        const response = await fetch(`https://microservicio-prendas.vercel.app/api/clothes`,
        {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${getCookie('token')}`
            },
            body: formData,
        })
        if (!response) console.log('Error')
        // const result = await response.json();
        // console.log(result);
        window.location.reload();
    }
    catch (error) {
        console.error('Error:', error)
    }
}
function getCookie(name) {
    let value = (`; ${document.cookie}`);
    let parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}