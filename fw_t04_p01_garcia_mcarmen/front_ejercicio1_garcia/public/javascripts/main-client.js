// public/javascripts/main-client.js

//const { response } = require("express");

async function paginarAntigua(pagina) {

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

async function paginar(pagina) {

  console.log("Paginando...");
  const contenedor = document.getElementById("container-characters");
  const peticion = await fetch(`/api/characters?page=${pagina}&limit=4`);
  console.log(peticion);
  const datos = await peticion.json();
  contenedor.innerHTML = "";
  console.log(datos);

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

async function infoModal(id) {
  
  const contenedor=document.getElementById("my_modal");
  console.log(id)
  const peticion=await fetch(`/api/episodes/${id}`);
  console.log("desde el cliente: "+peticion);

  const datos = await peticion.json();
  contenedor.innerHTML = "";
  console.log("desde el cliente 2: "+datos.data);


  /*   datos.data.characters.forEach(special => {
      traitsHTML += `<li>${special}</li>`;
    }); */

  contenedor.innerHTML+=` <div class="modal-box">
                                    <h3 class="text-lg font-bold">${datos.data.title}</h3>
                                    <p class="py-4">${datos.data.summary}</p>
                                    <div class="modal-action">
                                        <form method="dialog">
                                            <!-- if there is a button in form, it will close the modal -->
                                            <button class="btn">Close</button>
                                        </form>
                                    </div>
                                </div>`

}

document.addEventListener('DOMContentLoaded', () => {
  console.log("Hola: El DOM está listo");

});