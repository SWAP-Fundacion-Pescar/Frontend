document.addEventListener('DOMContentLoaded', () => {
    const catalogoDiv = document.getElementById('catalogo');

    const apiUrl = 'http://localhost:3005/Microservicio_Prendas';

    // obtener y mostrar las prendas
    async function cargarPrendas() {
        try {
            const response = await fetch(apiUrl);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const prendas = await response.json();

            // limpia del catálogo
            catalogoDiv.innerHTML = '';

            // iterar  y agregarlas al DOM
            prendas.forEach(prenda => {
                const prendaDiv = document.createElement('div');
                prendaDiv.className = 'prenda';
                prendaDiv.innerHTML = `
                    <img src="${prenda.imagen}" alt="${prenda.nombre}" class="prenda__img">
                    <h3>${prenda.nombre}</h3>
                    <p>${prenda.descripcion}</p>
                    <p>Precio: ${prenda.precio}</p>
                    <div class="actions">
                        <button class="favorite"><i class="fa fa-heart"></i></button>
                        <button class="exchange">Intercambiar</button>
                    </div>
                `;
                catalogoDiv.appendChild(prendaDiv);
            });
        } catch (error) {
            console.error('Error al cargar las prendas:', error);
            catalogoDiv.innerHTML = '<p>No se pudieron cargar las prendas. Inténtalo de nuevo más tarde.</p>';
        }
    }
    // cargar las prendas cuando la página esté lista
    cargarPrendas();
});
