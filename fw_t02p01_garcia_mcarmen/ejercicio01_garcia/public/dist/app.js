//debugger 
let a = 5;
console.log("holaaa practica typescript ");
console.log(a);
import { ApiService } from './ApiService.js';
import { Utilities } from './Utilities.js';
import { ViewService } from './ViewService.js';
import { StorageService } from './StorageService.js';
document.addEventListener("DOMContentLoaded", function () {
    // clases se las envio a quien a las necesite
    const api = new ApiService();
    const view = new ViewService();
    const local = new StorageService();
    // gestion vistas tmbn puedo hacer una funcion que se encargue de esto
    if (window.location.pathname.includes("index.html") || window.location.pathname === "/") {
        cargarIndex(api, view);
    }
    if (window.location.pathname.includes("registro.html")) {
        cargarRegistro(local, view);
    }
});
async function cargarIndex(api, view) {
    //elementos html los cojo en las fucniones que los necesite
    const contenedorRecetas = document.querySelector("#recetasHome");
    const selectCategory = document.querySelector("#selectCategorias");
    //variables con datos de funciones
    const categorias = await api.obtenerCategorias();
    //lamada funciones clases
    view.cargarCategoriasSelect(categorias, selectCategory);
    for (let i = 0; i < 8; i++) {
        const receta = await api.recetaAleatoria();
        //como puede ser null lo que deveulva lo tengo que compronbar antes
        if (receta != null) {
            view.pintarRecetasHome(receta, contenedorRecetas);
        }
    }
    // eventos 
    selectCategory.addEventListener("change", async function () {
        const categorySelect = selectCategory.value;
        contenedorRecetas.innerHTML = "";
        // url de la api que me devuelve un listado de catgorias con detalles simples de la misma
        const recetasCategoriaSelect = await api.obtenerPorCategoria(categorySelect);
        if (recetasCategoriaSelect) {
            // por cada elemento que hay en el array recetasCategorySelect va ejecutar su interior
            for (const receta of recetasCategoriaSelect) {
                const recetasCompleta = await api.obtenerPorId(receta.idMeal);
                if (recetasCompleta) {
                    view.pintarRecetasHome(recetasCompleta, contenedorRecetas);
                }
            }
        }
    });
}
function cargarRegistro(local, view) {
    const formRegistro = document.getElementById('registroForm');
    formRegistro.addEventListener('submit', (e) => {
        e.preventDefault();
        e.stopPropagation();
        try {
            if (Utilities.validarRegistro(formRegistro)) {
                const nameInput = formRegistro.querySelector('#nombre');
                const emailInput = formRegistro.querySelector('#email');
                const passInput = formRegistro.querySelector('#confirmPassword');
                const contenedor = document.getElementById('message');
                const new_user = {
                    id: local.getLastUser(), //funcion incremental del id
                    name: nameInput.value,
                    email: emailInput.value,
                    password: passInput.value
                };
                local.saveUser(new_user);
                console.log('Formulario valido\n Usuario crado: ', new_user);
                let messageConten = view.cargarAlerts(contenedor, "alert-success");
                //contenedor.appendChild(messageConten);
                setTimeout(() => {
                    window.location.href = "index.html";
                }, 2000);
            }
            else {
                console.warn("Hay errores en el formulario.");
            }
        }
        catch (error) {
            console.warn(error);
        }
    });
}
function cargarLogin(local) {
}
//# sourceMappingURL=app.js.map