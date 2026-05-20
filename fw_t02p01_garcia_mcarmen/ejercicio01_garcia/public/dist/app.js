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
        cargarIndex(api, view, local);
    }
    if (window.location.pathname.includes("registro.html")) {
        cargarRegistro(local, view);
        let botonLogin = document.getElementById("ingresar");
        if (botonLogin) {
            botonLogin.addEventListener("click", () => cargarLogin(local, view));
        }
    }
});
async function cargarIndex(api, view, local) {
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
    // cuando haya un cambio en la seleccion de la receta
    selectCategory.addEventListener("change", async function () {
        const categorySelect = selectCategory.value;
        contenedorRecetas.innerHTML = "";
        // url de la api que me devuelve un listado de catgorias con detalles simples de la misma
        const recetasCategoriaSelect = await api.obtenerPorCategoria(categorySelect);
        if (recetasCategoriaSelect) { // si hay algo
            for (let i = 0; i < 8; i++) {
                const recetasCompleta = await api.obtenerPorId(recetasCategoriaSelect[i].idMeal);
                if (recetasCompleta) {
                    view.pintarRecetasHome(recetasCompleta, contenedorRecetas);
                }
            }
        }
        else {
            // cargar algun error
            view.cargarAlerts(contenedorRecetas, "warning", "Error al cargar la categoria" + categorySelect);
        }
    });
    isLogin(local);
}
function cargarRegistro(local, view) {
    const formRegistro = document.getElementById('registroForm');
    formRegistro.addEventListener('submit', (e) => {
        e.preventDefault();
        e.stopPropagation();
        let contenedor = document.getElementById('message');
        let nameInput;
        let emailInput;
        let passInput;
        try {
            if (Utilities.validarRegistro(formRegistro, local)) { // si la validacion del formulario esta bien
                //crearUsuario();
                nameInput = formRegistro.querySelector('#nombre');
                emailInput = formRegistro.querySelector('#email');
                passInput = formRegistro.querySelector('#confirmPassword');
                const new_user = {
                    id: local.getLastUser(), //funcion incremental del id
                    name: nameInput.value,
                    email: emailInput.value,
                    password: passInput.value,
                    login: false
                };
                if (local.saveUser(new_user)) {
                    console.log("usuario creado: " + new_user);
                    view.cargarAlerts(contenedor, "success", "Usuario creado con exito!");
                    /* setTimeout(() => {
                        window.location.href = "index.html";
                    }, 2000);  */
                }
                else {
                    view.cargarAlerts(contenedor, "danger", "Error al crear el usuario");
                }
            }
            else {
                view.cargarAlerts(contenedor, "danger", "Hay errores en el formulario, revisa los campos");
                console.warn("Hay errores en el formulario.");
            }
        }
        catch (error) {
            console.warn(error);
        }
    });
}
function cargarLogin(local, view) {
    const formLogin = document.getElementById('loginForm');
    let contenedor = document.getElementById('message');
    formLogin.addEventListener('submit', (e) => {
        e.preventDefault();
        e.stopPropagation();
        try {
            if (Utilities.validarLogin(formLogin, local)) {
                view.cargarAlerts(contenedor, "success", "Credenciales validas!");
            }
            else {
                view.cargarAlerts(contenedor, "danger", "Credenciales no validas, vuelve a intentarlo");
            }
            setTimeout(() => {
                window.location.href = "index.html";
            }, 2000);
        }
        catch (error) {
            console.warn(error);
        }
    });
}
function isLogin(local) {
    const iconLogin = document.querySelector("#icon-login");
    const nombreUser = local.isLoginUser();
    console.log("Entro en login o no?????");
    if (nombreUser != null) {
        console.log(nombreUser);
        if (document.querySelector("#recetasHome")) {
            console.log("Entro en el recetas???");
            document.querySelectorAll("#recetasHome button").forEach(buton => {
                buton.classList.add("d-block");
                buton.classList.remove("d-none");
                iconLogin.classList.add("d-block");
                iconLogin.classList.remove("d-none");
                iconLogin.innerHTML = `<span>User:${nombreUser}</span>`;
            });
        }
    }
}
//# sourceMappingURL=app.js.map