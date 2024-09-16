import { addEventToSearchBar } from "./helpers.js";

addEventToSearchBar()
const apiUrl = 'http://localhost:3000/api/users/';
const usuarioId = 'idDelUsuario'; 

// carga los datos del usuario
fetch(`${apiUrl}/${usuarioId}`)
    .then(response => response.json())
    .then(usuario => {
        //  datos al HTML
        document.getElementById('foto-perfil').src = usuario.media;
        document.getElementById('nombre-usuario').innerText = usuario.name;
        document.getElementById('ubicacion-usuario').innerText = usuario.ubicacion;
        document.getElementById('descripcion-usuario').innerText = usuario.description;

        // carga publicaciones
        const publicacionesContainer = document.getElementById('publicaciones-container');
        usuario.publicaciones.forEach(publicacion => {
            const publicacionDiv = document.createElement('div');
            publicacionDiv.classList.add('publicacion-item');
            publicacionDiv.innerHTML = `
                <img src="${publicacion.media}" alt="${publicacion.name}">
                <h3>${publicacion.name}</h3>
                <p>${publicacion.ubicacion}</p>
                <button class="intercambiar">Intercambiar</button>
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