"use strict";
//debugger 
let a = 5;
console.log("holaaa practica typescript ");
console.log(a);
document.addEventListener("DOMContentLoaded", async function () {
    //pintarRecetasHome();
    await cargarTodasDatosApi();
});
function pintarRecetasHome() {
}
async function cargarTodasDatosApi() {
    const data = [];
    try {
        const respuesta = await fetch("https://www.themealdb.com/api/json/v1/1/random.php");
        const data2 = await respuesta.json();
        data.push(...data2);
        console.log(data2);
    }
    catch (error) {
        console.log(error);
    }
    return data;
}
//# sourceMappingURL=app.js.map