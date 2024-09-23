// Cerrar sesión
function logoutUser() {
    document.cookie = "ID= ; expires = Thu, 01 Jan 1970 00:00:00 GMT"
    document.cookie = "token= ; expires = Thu, 01 Jan 1970 00:00:00 GMT"
    window.open('../../pages/landing.html', '_self');
}

// Evento de cierre de sesión
const botonSalir = document.getElementById('logoutBtn')
botonSalir.addEventListener('click', ()=>{
    logoutUser();
}); 