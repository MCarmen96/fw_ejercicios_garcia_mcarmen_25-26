
//debugger 
let a: number = 5;
console.log("holaaa practica typescript ");
console.log(a);

import { ApiService } from './ApiService.js';
import { MyMeal } from './MyMeal.js';
import { Utilities } from './Utilities.js';
import { ViewService } from './ViewService.js';
import { User } from './User.js';
import { StorageService } from './StorageService.js';



document.addEventListener("DOMContentLoaded", function () {

    // clases se las envio a quien a las necesite
    const api: ApiService = new ApiService();
    const view: ViewService = new ViewService();
    const local: StorageService = new StorageService();



    // gestion vistas tmbn puedo hacer una funcion que se encargue de esto
    if (window.location.pathname.includes("index.html") || window.location.pathname === "/") {

        cargarIndex(api, view, local);

    }

    if (window.location.pathname.includes("registro.html")) {
        cargarRegistro(local, view);
        let botonLogin = document.getElementById("ingresar") as HTMLButtonElement;
        if (botonLogin) {
            botonLogin.addEventListener("click", () => cargarLogin(local, view));
        }
    }

});


async function cargarIndex(api: ApiService, view: ViewService, local: StorageService) {


    //elementos html los cojo en las fucniones que los necesite
    const contenedorRecetas = document.querySelector("#recetasHome") as HTMLDivElement;
    const selectCategory = document.querySelector("#selectCategorias") as HTMLSelectElement;
    //variables con datos de funciones
    const categorias = await api.obtenerCategorias();
    //lamada funciones clases
    view.cargarCategoriasSelect(categorias, selectCategory)

    for (let i = 0; i < 8; i++) {
        const receta = await api.recetaAleatoria();
        //como puede ser null lo que deveulva lo tengo que compronbar antes
        if (receta != null) {
            view.pintarRecetasHome(receta, contenedorRecetas, local);
        }
    }
    
    


    // cuando haya un cambio en la seleccion de la receta
    selectCategory.addEventListener("change", async function () {

        const categorySelect = selectCategory.value;
        console.log("select "+categorySelect);
        contenedorRecetas.innerHTML = "";

        if (document.querySelector("#saveCategory")?.classList.contains("d-block")) {
            document.querySelector("#saveCategory")?.removeAttribute("disabled");
        }

        cargarIndexPorCategoria(categorySelect,contenedorRecetas,api,view,local);

    })

    // guardar categoria
    document.querySelector("#saveCategory")?.addEventListener('click',()=>{
        local.saveCategory(selectCategory.value);

    })

   /*  document.querySelectorAll("#recetasHome button").forEach() */
    
}


async function cargarIndexPorCategoria(categorySelect:string,contenedorRecetas:HTMLDivElement,api:ApiService,view:ViewService,local:StorageService){
     // url de la api que me devuelve un listado de catgorias con detalles simples de la misma
        const recetasCategoriaSelect = await api.obtenerPorCategoria(categorySelect);

        if (recetasCategoriaSelect) { // si hay algo
            for (let i = 0; i < 8; i++) {
                const recetasCompleta = await api.obtenerPorId(recetasCategoriaSelect[i].idMeal);
                console.log("Receta completa desde el select category: " + recetasCompleta);
                if (recetasCompleta) {
                    view.pintarRecetasHome(recetasCompleta, contenedorRecetas, local);
                }
            }
        } else {
            // cargar algun error
            view.cargarAlerts(contenedorRecetas, "warning", "Error al cargar la categoria" + categorySelect);
        }
}

function cargarRegistro(local: StorageService, view: ViewService) {

    const formRegistro = document.getElementById('registroForm') as HTMLFormElement;
    formRegistro.addEventListener('submit', (e: SubmitEvent) => {
        e.preventDefault();
        e.stopPropagation();
        let contenedor = document.getElementById('message') as HTMLDivElement;
        let nameInput;
        let emailInput;
        let passInput;

        try {
            if (Utilities.validarRegistro(formRegistro, local)) { // si la validacion del formulario esta bien
                //crearUsuario();
                nameInput = formRegistro.querySelector('#nombre') as HTMLInputElement;
                emailInput = formRegistro.querySelector('#email') as HTMLInputElement;
                passInput = formRegistro.querySelector('#confirmPassword') as HTMLInputElement;
                const new_user: User = {
                    id: local.getLastUser(),//funcion incremental del id
                    name: nameInput.value,
                    email: emailInput.value,
                    password: passInput.value,
                };

                if (local.saveUser(new_user)) {
                    console.log("usuario creado: " + new_user);
                    view.cargarAlerts(contenedor, "success", "Usuario creado con exito!");
                    /* setTimeout(() => {
                        window.location.href = "index.html";
                    }, 2000);  */
                } else {
                    view.cargarAlerts(contenedor, "danger", "Error al crear el usuario");
                }
            } else {
                view.cargarAlerts(contenedor, "danger", "Hay errores en el formulario, revisa los campos");
                console.warn("Hay errores en el formulario.");
            }
        } catch (error) {
            console.warn(error);
        }


    });

}

function cargarLogin(local: StorageService, view: ViewService) {

    const formLogin = document.getElementById('loginForm') as HTMLFormElement;

    let contenedor = document.getElementById('message') as HTMLDivElement;
    formLogin.addEventListener('submit', (e: SubmitEvent) => {
        e.preventDefault();
        e.stopPropagation();
        try {

            if (Utilities.validarLogin(formLogin, local)) {
                view.cargarAlerts(contenedor, "success", "Credenciales validas!");
                const emailInput = document.getElementById("loginEmail") as HTMLInputElement;
                //local.activeLogin(emailInput.value);
                let user = local.getOneUser(emailInput.value);
                if (user != null) {
                    local.saveSession(user);
                }

                setTimeout(() => {
                    window.location.href = "index.html";
                }, 2000); 

            } else {
                view.cargarAlerts(contenedor, "danger", "Credenciales no validas, vuelve a intentarlo")
            }

        } catch (error) {
            console.warn(error);
        }
    });


}



/* function saveMeal(idMeal:string){
    
} */

