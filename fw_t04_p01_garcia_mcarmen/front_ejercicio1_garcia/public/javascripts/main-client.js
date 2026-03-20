// public/javascripts/main-client.js

async function paginar(pagina) {
    
    console.log("Paginando...");
    const contenedor=document.getElementById("container-characters");
    const peticion=await fetch(`/api/characters?page=${pagina}`);// esta linea es del gemini
    const datos = await peticion.json();// esta tmbn es del gemini
    contenedor.innerHTML = "";
    datos.data.forEach(element => {
        contenedor.innerHTML+=`<div class="card bg-base-100 w-full shadow-sm border border-gray-100">
          <figure>
            <img src="${element.img}" alt="${$element.name}" class="w-full object-cover h-48" />
          </figure>
          <div class="card-body">
            <% if (element.name !=null){ %>
              <h2 class="card-title text-base">
                ${$element.name}
              </h2>
              <p class="text-sm">Edad: ${element.age } 
              </p>
              <p class="text-sm">Especie: ${element.species}
              </p>

              <% if( element.specialTraits && element.specialTraits.length>0 ){ %>
                <ul>
                  <p class="text-sm">Special traits:</p>
                  <% element.specialTraits.forEach( special=> { %>
                    <li>
                      <%= special %>
                    </li>
                    <% }); %>
                </ul>
                <% } %>

                  <% } else { %>
                    <h2 class="card-title text-base text-gray-400">Desconocido</h2>
                    <% } %>

          </div>
        </div>
        <% }); %>`
    });
}

document.addEventListener('DOMContentLoaded', () => {
    console.log("Hola: El DOM está listo");
    paginar();
});

