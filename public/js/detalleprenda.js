document.addEventListener('DOMContentLoaded', function() {
    const apiUrl = 'http://localhost/api/Clothes'; 
    const urlParams = new URLSearchParams(window.location.search);
    const prendaId = urlParams.get('id');

    if (prendaId) {
        fetch(`http://localhost:3001/api/prendas/${prendaId}`)
            .then(response => response.json())
            .then(prenda => {
                document.getElementById('nombrePrenda').textContent = prenda.name;
                document.getElementById('ubicacionPrenda').textContent = prenda.lugar;
                document.getElementById('colorPrenda').textContent = prenda.color;
                document.getElementById('tallaPrenda').textContent = prenda.size;
                document.getElementById('categoriaPrenda').textContent = prenda.category;
                document.getElementById('descripcionPrenda').textContent = prenda.description;
                

                document.getElementById('intercambio-color').textContent = prenda.intercambio.color;
                document.getElementById('intercambio-talle').textContent = prenda.intercambio.size;
                document.getElementById('intercambio-categoria').textContent = prenda.intercambio.category;

                cargarPrendasRelacionadas(prenda.category);
            })
            .catch(error => console.error('Error al obtener los detalles de la prenda:', error));
    } else {
        console.error('No se encontró el ID de la prenda en la URL.');
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
});


function irADetalle(prendaId) {
    window.location.href = `detalle.html?id=${prendaId}`;
}