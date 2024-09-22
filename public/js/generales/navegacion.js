//NAV

//USUARIO LOGUEADO - NO LOGUEADO
const botonesUsuario = document.getElementById('nav__userButton');
const botonesUsuarioLogueado = document.getElementById('nav__userButton-logged');

const linksCentrales = document.getElementById("nav__menu");
const linksCentralesLogueado = document.getElementById("nav__menu-logged")

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

        linksCentrales.classList.add("nav__userButton--invisible")
        linksCentralesLogueado.classList.add("nav__userButton--visible")
    } else {
        botonesUsuario.classList.add("nav__userButton--visible");
        botonesUsuarioLogueado.classList.add("nav__userButton--invisible");

        linksCentrales.classList.add("nav__userButton--visible")
        linksCentralesLogueado.classList.add("nav__userButton--invisible")
    }
}
updateNav();



//USUARIO LOGUEADO: Iconos desplegables 
const dropdownBtnBell = document.getElementById("btn_bell")
const dropdownMenuBell = document.getElementById("menu_bell")

const dropdownBtnChat = document.getElementById("btn_chat");
const dropdownMenuChat = document.getElementById("menu_chat");

const dropdownBtnUser = document.getElementById("btn_user");
const dropdownMenuUser = document.getElementById("menu_user");


const toggleDropdown = function (menu) {
    menu.classList.toggle("show");
};


// Toggle dropdown se abre/cierra con click
dropdownBtnUser.addEventListener("click", function (e) {
    e.stopPropagation();
    toggleDropdown(dropdownMenuUser);
});

dropdownBtnChat.addEventListener("click", function (e) {
    e.stopPropagation();
    toggleDropdown(dropdownMenuChat);
});

dropdownBtnBell.addEventListener("click", function (e) {
    e.stopPropagation();
    toggleDropdown(dropdownMenuBell);
});


// Cerrar si se cliquea por fuera
document.documentElement.addEventListener("click", function () {
    if (dropdownMenuUser.classList.contains("show")) {
        toggleDropdown(dropdownMenuUser)
    }else if(dropdownMenuChat.classList.contains("show")){
        toggleDropdown(dropdownMenuChat)
    }else if(dropdownMenuBell.classList.contains("show")){
        toggleDropdown(dropdownMenuBell)
    }
});