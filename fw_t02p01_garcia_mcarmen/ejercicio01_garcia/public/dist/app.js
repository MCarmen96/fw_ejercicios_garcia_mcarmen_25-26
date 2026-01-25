//debugger 
let a = 5;
console.log("holaaa practica typescript ");
console.log(a);
import { ApiService } from './ApiService.js';
import { ViewService } from './ViewService.js';
const api = new ApiService();
document.addEventListener("DOMContentLoaded", async function () {
    // clases
    const api = new ApiService();
    const view = new ViewService();
    //elementos html
    const contenedorRecetas = document.querySelector("#recetasHome");
    //lamada funciones clases
    for (let i = 0; i < 8; i++) {
        const receta = await api.recetaAleatoria();
        //como puede ser null lo que deveulva lo tengo que compronbar antes
        if (receta != null) {
            view.pintarRecetasHome(receta, contenedorRecetas);
        }
    }
});
//# sourceMappingURL=app.js.map