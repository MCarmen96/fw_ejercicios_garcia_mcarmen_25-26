//debugger 
let a: number = 5;
console.log("holaaa practica typescript ");
console.log(a);

import { ApiService } from './ApiService.js';
import { MyMeal } from './MyMeal.js';
import { Utilities } from './Utilities.js';
import { ViewService } from './ViewService.js';


const api=new ApiService();


document.addEventListener("DOMContentLoaded",async function(){
    
    // clases
    const api:ApiService=new ApiService();
    const view:ViewService=new ViewService();
    
    //elementos html
    const contenedorRecetas=document.querySelector("#recetasHome") as HTMLDivElement;
    const selectCategory=document.querySelector("#selectCategorias") as HTMLSelectElement;
    const formRegistro=document.getElementById('registroForm') as HTMLFormElement;

    //variables con datos de funciones
    const categorias=await api.obtenerCategorias();
    
    //lamada funciones clases
    view.cargarCategoriasSelect(categorias,selectCategory)

    for (let i = 0; i < 8; i++) {
        const receta = await api.recetaAleatoria();
         //como puede ser null lo que deveulva lo tengo que compronbar antes
        if (receta!=null) {
            view.pintarRecetasHome(receta, contenedorRecetas);
        }
    }

    // eventos 
    selectCategory.addEventListener("change",async function() {
        
        const categorySelect=selectCategory.value;
        contenedorRecetas.innerHTML="";
        
        // url de la api que me devuelve un listado de catgorias con detalles simples de la misma
        const recetasCategoriaSelect=await api.obtenerPorCategoria(categorySelect);
        
        if(recetasCategoriaSelect){
            // por cada elemento que hay en el array recetasCategorySelect va ejecutar su interior
            for(const receta of recetasCategoriaSelect){

                const recetasCompleta= await api.obtenerPorId(receta.idMeal);

                if(recetasCompleta){
                    view.pintarRecetasHome(recetasCompleta,contenedorRecetas);
                }
            }
        }
    })

    formRegistro.addEventListener('submit',(e:SubmitEvent)=>{

        if(Utilities.validarRegistro(formRegistro)){
            console.log('Formulario valido');
        }else{
            console.warn("Hay errores en el formulario.");
        }
    });
    


    



});

