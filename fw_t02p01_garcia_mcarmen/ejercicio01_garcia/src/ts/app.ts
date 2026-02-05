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
        cargarIndex(api,view);
    }

    if (window.location.pathname.includes("registro.html")) {
        cargarRegistro(local,view);
    }

});


async function cargarIndex(api:ApiService,view:ViewService){

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
        })
}

function cargarRegistro(local:StorageService,view:ViewService){

    const formRegistro = document.getElementById('registroForm') as HTMLFormElement;
    formRegistro.addEventListener('submit', (e: SubmitEvent) => {
            e.preventDefault();
            e.stopPropagation();
            try {
                if (Utilities.validarRegistro(formRegistro)) {

                    const nameInput = formRegistro.querySelector('#nombre') as HTMLInputElement;
                    const emailInput = formRegistro.querySelector('#email') as HTMLInputElement;
                    const passInput = formRegistro.querySelector('#confirmPassword') as HTMLInputElement;
                    const contenedor = document.getElementById('message') as HTMLDivElement;

                    const new_user: User = {
                        id: local.getLastUser(),//funcion incremental del id
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



                } else {
                    console.warn("Hay errores en el formulario.");
                }
            } catch (error) {

                console.warn(error);

            }


        });

}

function cargarLogin(local:StorageService){

    const emailInput=document.getElementById("email")as HTMLInputElement;
    const password=document.getElementById("password") as HTMLInputElement;

    if(local.getPasswordUser(password.value)&&local.getEmailUser(emailInput.value)){
        
    }

}

