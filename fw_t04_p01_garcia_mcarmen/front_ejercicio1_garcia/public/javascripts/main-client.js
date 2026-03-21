// public/javascripts/main-client.js

//const { response } = require("express");

async function paginar(pagina) {

  console.log("Paginando...");
  const contenedor = document.getElementById("container-characters");
  const peticion = await fetch(`http://localhost:3000/api/characters?page=${pagina}&limit=4`,
    { headers: { Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjlhYWM1ODczMmYwOWMxZWE3YjE5N2JmIiwiaWF0IjoxNzczODU5ODc5LCJleHAiOjE3NzQ0NjQ2Nzl9.L5K-JiuJ9mdlK8DgOwyMo1zmTYvpBO_bYuwFm0gGl-0` } });


  const datos = await peticion.json();
  contenedor.innerHTML = "";
  console.log("Datos de la peticion de la paginacion: " + datos.data);
   let traitsHTML = "";
  datos.data.forEach(element => {
   
    element.specialTraits.forEach(special => {
      traitsHTML += `<li>${special}</li>`;
    });
    contenedor.innerHTML += `<div class="card bg-base-100 w-full shadow-sm border border-gray-100">
          <figure>
            <img src="${element.img}" alt="${element.name}" class="w-full object-cover h-48" />
          </figure>
          <div class="card-body">
              <h2 class="card-title text-base">
                ${element.name}
              </h2>
              <p class="text-sm">Edad: ${element.age} 
              </p>
              <p class="text-sm">Especie: ${element.species}
              </p>
              
              <ul>
                <p class="text-sm">Special traits:</p>
                ${traitsHTML}
              </ul>
          </div>
        </div>
       `
       traitsHTML = "";
  });


}

document.addEventListener('DOMContentLoaded', () => {
  console.log("Hola: El DOM está listo");
  paginar();
});