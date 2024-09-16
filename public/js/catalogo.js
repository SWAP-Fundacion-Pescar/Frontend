document.addEventListener('DOMContentLoaded', () => {
    const catalogoDiv = document.getElementById('catalogo');

    const clotheUrl = 'https://microservicio-prendas.vercel.app/api/clothes';   

    // obtener y mostrar las prendas
    async function cargarPrendas() {
        try {
            const response = await fetch(clotheUrl);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const prendas = await response.json();
            // limpia del catálogo
            catalogoDiv.innerHTML = '';

            // iterar  y agregarlas al DOM
            prendas.forEach(async prenda => {
                const prendaDiv = document.createElement('div');
                prendaDiv.className = 'prenda';
                let userInfo;
                try
                {
                    const response = await fetch(`https://microservicio-usuarios-three.vercel.app/api/users/${prenda.userId}`)
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    userInfo = await response.json();
                }
                catch(error)
                {
                    console.error('Error al cargar informacion del usuario: ', error);
                }
                console.log(userInfo)
                prendaDiv.innerHTML = `
                    <div class="prenda-img"><img src="${prenda.media[0].url}" alt="${prenda.name}" class="prenda__img"></div>
                    <p>${prenda.name}</p>
                    <p>${userInfo.city}</p>                                            
                    <a href="" class="swap__card__button button">Intercambiar</a>                 
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
