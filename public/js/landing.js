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