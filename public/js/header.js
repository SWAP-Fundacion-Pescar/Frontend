/*function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}

// consulta al microservi
function checkUserStatus() {
    const userToken = getCookie('userToken'); 

    const userLoggedInButtons = document.getElementById('nav__userButton-logged');
    const userNotLoggedInButtons = document.getElementById('nav__userButton');

    if (userToken) {
        // llama al micro y valida el token
        fetch('https://tu-microservicio-usuarios.com/validarToken', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${userToken}` 
            },
            body: JSON.stringify({ token: userToken })
        })
        .then(response => response.json())
        .then(data => {
            if (data.valid) {
                // si es valido muestra los botones de usuario
                userLoggedInButtons.style.display = 'flex';
                userNotLoggedInButtons.style.display = 'none';
            } else {
                // si es invalido muestra botones de no logueado
                document.cookie = 'userToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
                userLoggedInButtons.style.display = 'none';
                userNotLoggedInButtons.style.display = 'flex';
            }
        })
        .catch(error => {
            console.error('Error al validar el token:', error);
            userLoggedInButtons.style.display = 'none';
            userNotLoggedInButtons.style.display = 'flex';
        });
    } else {
        // Si no hay token, mostrar botones de no logueado
        userLoggedInButtons.style.display = 'none';
        userNotLoggedInButtons.style.display = 'flex';
    }
}

// cerrar sesion
document.getElementById('logoutBtn').addEventListener('click', function() {
    document.cookie = 'userToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    
    location.reload();
});

window.onload = checkUserStatus;