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

async function infoModal(id_episodio) {

  const contenedor = document.getElementById("box");

  console.log(id_episodio)
  const peticion = await fetch(`/api/episodes/${id_episodio}`);
  console.log("desde el cliente: " + peticion);

  const datos = await peticion.json();
  //contenedor.innerHTML = "";
  console.log("desde el cliente 2: " + datos.title);

  /*   datos.data.characters.forEach(special => {
      traitsHTML += `<li>${special}</li>`;
    }); */

  contenedor.innerHTML = ` 
                                  <h3 class="text-lg font-bold">${datos.title}</h3>
                                    <p class="py-4">${datos.summary}</p>
                                     <h3 class="text-lg font-bold">Personajes</h3>
                                `;
  console.log(datos.characters[2].name);
  for (let index = 0; index < datos.characters.length; index++) {
    contenedor.innerHTML += `        
                                      <ul>
                                          <li>
                                              ${datos.characters[index].name}
                                          </li>
                                      </ul>`;
    //console.log(datos.characters[index].name)
  }

  contenedor.innerHTML += `   <div class="modal-action">
                                        <form method="dialog">
                                            <!-- if there is a button in form, it will close the modal -->
                                            <button class="btn">Close</button>
                                        </form>
                                    </div>`;

  document.getElementById('my_modal').showModal();

}

async function createEpisode() {

  const form = document.getElementById('episodeForm');

  form.addEventListener('submit', (e) => {
    
    const titleInput = document.getElementById('title');
    const errorTitle = document.getElementById('error-title');

    const codeInput = document.querySelector('input[name="code"]');
    const errorCode = document.getElementById('error-code'); 

    const yearInput = document.querySelector('input[name="year"]');
    const errorYear = document.getElementById('error-year');

    const summaryInput = document.querySelector('textarea[name="summary"]');
    const errorSummary = document.getElementById('error-summary');

    const selectedCharacters = form.querySelectorAll('input[name="characterIds"]:checked');

    let isValid = true; 


    if (titleInput.value.trim().length < 3) {
      e.preventDefault(); 
      errorTitle.textContent = 'El título es obligatorio y debe tener al menos 3 caracteres';
      errorTitle.classList.remove('hidden', 'validator-hint'); 
      errorTitle.style.display = 'block'; 
      titleInput.classList.add('input-error');
      isValid = false;
    }

    if (codeInput.value.trim() === "") {
      e.preventDefault();
      
      if (errorCode) {
        errorCode.textContent = 'El código del episodio es obligatorio';
        errorCode.style.display = 'block';
      }
      codeInput.classList.add('input-error');
      isValid = false;
    }

  
    const yearValue = parseInt(yearInput.value);
    if (isNaN(yearValue) || yearValue < 2020 || yearValue > 2026) {
      e.preventDefault();
      if (errorYear) {
        errorYear.textContent = 'Introduce un año válido entre 2020 y 2026';
        errorYear.style.display = 'block';
      }
      yearInput.classList.add('input-error');
      isValid = false;
    }


    if (summaryInput.value.trim().length < 10) {
      e.preventDefault();
      if (errorSummary) {
        errorSummary.textContent = 'El resumen debe tener al menos 10 caracteres';
        errorSummary.style.display = 'block';
      }
      summaryInput.classList.add('textarea-error');
      isValid = false;
    }

    
    if (selectedCharacters.length === 0) {
      e.preventDefault();
      alert("Debes seleccionar al menos un personaje para crear el episodio");
      isValid = false;
    }

    const alertBox = document.getElementById('alert-error-container');
    const alertText = document.getElementById('alert-error-text');
    if (!isValid) {
      e.preventDefault();
      alertText.innerText = "Por favor, corrige los errores en el formulario.";
      alertBox.classList.remove('hidden'); 
    } else {
      console.log("Todo correcto, enviando al servidor...");
      alertText.innerText= "Episodio creado!!";
      alertText.remove("alert-error");
      alertText.classList.add("alert-success")
      alertBox.classList.remove('hidden');
      
    }
  });

}



createEpisode();
document.addEventListener('DOMContentLoaded', () => {
  console.log("Hola: El DOM está listo");

});