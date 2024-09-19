import { addEventToSearchBar } from "./helpers.js";
document.addEventListener("DOMContentLoaded", function () {
    addEventToSearchBar();
    addEventListeners();
    loadUserData();
});

function addEventListeners()
{
    const btn = document.getElementById('save-btn');
    btn.addEventListener('click', () => 
        {
            updateUser();
        })
}
async function updateUser() {
    let body = {};
    const name = document.getElementById('nombre').value;
    const lastName = document.getElementById('apellido').value;
    const username = document.getElementById('user').value;
    const city = document.getElementById('city').value;
    if(name) body.name = name;
    if(lastName) body.lastName = lastName;
    if(username) body.username = username;
    if(city) body.city = city;
    const response = await fetch(`http://localhost:3000/api/users/info`, 
        {
            method: 'PUT',
            headers: 
            {
                'Authorization': `Bearer ${getCookie('token')}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        })
    if (!response) console.error('Error: ', response.status)        
    const content = await response.json();
    console.log(content);
    window.open(`../pages/perfil.html?id=${getCookie('ID')}`, '_self');
}

function getCookie(name) {
    let value = (`; ${document.cookie}`);
    let parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}

async function loadUserData()
{
    const response = await fetch(`http://localhost:3000/api/users/${getCookie('ID')}`);
    if(!response) console.error('Error:', response.status);
    const userData = await response.json();
    console.log(userData);
    document.getElementById('nombre').value = userData.name;
    document.getElementById('apellido').value = userData.lastName;
    document.getElementById('city').value = userData.city;
    document.getElementById('user').value = userData.username;
    document.getElementById('email-usuario').value = userData.email;
    document.getElementById('profile-initial').value = userData.name.charAt(0);
    document.getElementById('nombre-completo').value = `${userData.name} ${userData.lastName}`;
}
// // carga los datos del usuario desde el microservicio
// function cargarDatosUsuario() {
//     fetch('http://localhost:3000/api/users/')
//         .then(response => response.json())
//         .then(data => {
//             nombreInput.value = data.name;
//             apellidoInput.value = data.lastname;
//             telefonoInput.value = data.telefono;
//             userInput.value = data.user;
//             emailUsuario.textContent = data.email;
//             nombreCompleto.textContent = `${data.name} ${data.lastname}`;
//             profileInitial.textContent = data.name.charAt(0); // primera letra 
//         })
//         .catch(error => console.error('Error al cargar los datos:', error));
// }
// // Llamar a la función para cargar los datos del usuario
// cargarDatosUsuario();