"use strict";
//debugger 
let a = 5;
console.log("holaaa practica typescript ");
console.log(a);
//import { ApiService } from '/.ApiService.js';
document.addEventListener("DOMContentLoaded", function () {
    //pintarRecetasHome();
    const api = new ApiService();
    api.recetaAleatoria().then(data => {
        console.log(data);
    });
    api.obtenerCategorias().then(data => {
        console.log("categorias....", data);
    });
});
function pintarRecetasHome() {
    //const datos=api.recetaAleatoria();
    const contenedor = document.querySelector("#recetasHome");
}
function cargarSelectCategoria() {
}
//# sourceMappingURL=app.js.map