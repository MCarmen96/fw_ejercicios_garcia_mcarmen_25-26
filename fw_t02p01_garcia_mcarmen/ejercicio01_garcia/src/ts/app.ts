//debugger 
let a: number = 5;
console.log("holaaa practica typescript ");
console.log(a);

document.addEventListener("DOMContentLoaded", async function(){
    //pintarRecetasHome();
    await cargarTodasDatosApi()
});

function pintarRecetasHome(){

}

async function cargarTodasDatosApi(): Promise<Receta>{
    const data:Receta[]=[];

    try{
        const respuesta:Response=await fetch("https://www.themealdb.com/api/json/v1/1/random.php");
        const  data2=await respuesta.json();
        data.push(...data2);
        console.log(data2);

    }catch(error:unknown){
        console.log(error);
    }
    
    return data;
}