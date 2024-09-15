document.addEventListener("DOMContentLoaded", function() {
    const nombreInput = document.getElementById('nombre');
    const apellidoInput = document.getElementById('apellido');
    const telefonoInput = document.getElementById('telefono');
    const userInput = document.getElementById('user');
    const emailUsuario = document.getElementById('email-usuario');
    const profileInitial = document.getElementById('profile-initial');
    const nombreCompleto = document.getElementById('nombre-completo');
    const saveBtn = document.getElementById('save-btn');

    // carga los datos del usuario desde el microservicio
    function cargarDatosUsuario() {
        fetch('http://localhost:3000/api/users/')
            .then(response => response.json())
            .then(data => {
                nombreInput.value = data.name;
                apellidoInput.value = data.lastname;
                telefonoInput.value = data.telefono;
                userInput.value = data.user;
                emailUsuario.textContent = data.email;
                nombreCompleto.textContent = `${data.name} ${data.lastname}`;
                profileInitial.textContent = data.name.charAt(0); // primera letra 
            })
            .catch(error => console.error('Error al cargar los datos:', error));
    }

    // Función para actualizar los datos del usuario
    saveBtn.addEventListener('click', function() {
        const usuarioActualizado = {
            name: nombreInput.value,
            lastname: apellidoInput.value,
            telefono: telefonoInput.value,
            user: userInput.value
        };

        fetch('http://localhost:3000/api/users/', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(usuarioActualizado)
        })
        .then(response => {
            if (response.ok) {
                alert('Información actualizada correctamente.');
            } else {
                alert('Hubo un problema al actualizar la información.');
            }
        })
        .catch(error => console.error('Error al actualizar los datos:', error));
    });

    // Llamar a la función para cargar los datos del usuario
    cargarDatosUsuario();
});