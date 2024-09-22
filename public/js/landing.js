import { addEventToSearchBar } from "./helpers.js";

addEventToSearchBar();
// NAV: Menú hamburguesa
const menu = document.getElementById("menu")
const abrirMenu = document.getElementById("abrirMenu")
const cerrarMenu = document.getElementById("cerrarMenu")

abrirMenu.addEventListener("click", ()=>{
    menu.classList.add("nav__hamburger--visible");
    abrirMenu.classList.add("nav__hamburger--invisible");
})

cerrarMenu.addEventListener("click", ()=>{
    menu.classList.remove("nav__hamburger--visible");
    abrirMenu.classList.remove("nav__hamburger--invisible");
})
//SECCION INTERCAMBIA: Carrousel
const swap__cards = document.querySelector(".swap__card--container"); 
const swap__prevBtn = document.querySelector("#swap__prevBtn");
const swap__nextBtn = document.querySelector("#swap__nextBtn");


    swap__nextBtn.addEventListener("click", () => {
        swap__cards.scrollLeft += 800;
    });
    swap__prevBtn.addEventListener("click", () => {
        swap__cards.scrollLeft -= 800;
    });

//NAV: Botones de usuario 
const botonesUsuario = document.getElementById('nav__userButton');
const botonesUsuarioLogueado = document.getElementById('nav__userButton-logged');

// Obtener el valor de una cookie
function getCookie(name) {
    const match = document.cookie.match(new RegExp(`(^|; )${name}=([^;]*)`));
    return match ? decodeURIComponent(match[2]) : null;
}

// Verificar si el usuario está logueado
function isLoggedIn() {
    return getCookie('ID') && getCookie('token');
}

// Actualizar la navegación
function updateNav() {
    const loggedIn = isLoggedIn();

    if (loggedIn) {
        botonesUsuario.classList.add("nav__userButton--invisible");
        botonesUsuarioLogueado.classList.add("nav__userButton--visible");
    } else {
        botonesUsuario.classList.add("nav__userButton--visible");
        botonesUsuarioLogueado.classList.add("nav__userButton--invisible");
    }
}
updateNav();

// Cerrar sesión
function logoutUser() {
    document.cookie = "ID= ; expires = Thu, 01 Jan 1970 00:00:00 GMT"
    document.cookie = "token= ; expires = Thu, 01 Jan 1970 00:00:00 GMT"
    window.open('../pages/landing.html', '_self');
}

// Evento de cierre de sesión
const botonSalir = document.getElementById('logoutBtn')
botonSalir.addEventListener('click', ()=>{
    updateNav();
    logoutUser();
}); 