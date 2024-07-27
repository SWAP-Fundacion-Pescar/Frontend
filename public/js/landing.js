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

