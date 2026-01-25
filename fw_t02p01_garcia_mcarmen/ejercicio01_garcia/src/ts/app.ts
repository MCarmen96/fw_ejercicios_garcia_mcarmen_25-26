//debugger 
let a: number = 5;
console.log("holaaa practica typescript ");
console.log(a);

import { ApiService } from './ApiService.js';
import { ViewService } from './ViewService.js';


const api=new ApiService();


document.addEventListener("DOMContentLoaded",function(){
    //pintarRecetasHome();
    api.recetaAleatoria().then(data=>{
        console.log(data);
    });
    
    api.obtenerCategorias().then(data=>{
        console.log("categorias....",data);
    })
});

function pintarRecetasHome(){

    const datos=api.recetaAleatoria();
    const view=new ViewService();
    const contenedor = document.querySelector("#recetasHome") as HTMLDivElement; 
    view.pintarRecetasHome(datos,contenedor);
    //const contenedor:HTMLElement|null=document.querySelector("#recetasHome");
}

function cargarSelectCategoria(){

}