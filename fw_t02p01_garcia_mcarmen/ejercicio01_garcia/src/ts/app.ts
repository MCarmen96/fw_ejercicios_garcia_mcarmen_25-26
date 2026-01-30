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

const api = new ApiService();


document.addEventListener("DOMContentLoaded", async function () {

    // clases
    const api: ApiService = new ApiService();
    const view: ViewService = new ViewService();
    const local: StorageService = new StorageService();

    //elementos html
    const contenedorRecetas = document.querySelector("#recetasHome") as HTMLDivElement;
    const selectCategory = document.querySelector("#selectCategorias") as HTMLSelectElement;
    const formRegistro = document.getElementById('registroForm') as HTMLFormElement;

    if (window.location.pathname == "index.html") {
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



    if (window.location.pathname == "registro.html") {

        formRegistro.addEventListener('submit', (e: SubmitEvent) => {

            if (Utilities.validarRegistro(formRegistro)) {

                const nameInput = formRegistro.querySelector('#nombre') as HTMLInputElement;
                const emailInput = formRegistro.querySelector('#email') as HTMLInputElement;
                const passInput = formRegistro.querySelector('#confirmPassword') as HTMLInputElement;

                const new_user: User = {
                    id: 1,
                    name: nameInput.value,
                    email: emailInput.value,
                    password: passInput.value
                };
                local.saveUser(new_user);
                console.log('Formulario valido\n Usuario crado: ', new_user);
                window.location.href = "index.html";

            } else {
                console.warn("Hay errores en el formulario.");
            }
        });

    }







});

