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


  const contenedor = document.getElementById("container-characters");
  contenedor.innerHTML = "";
  try {
    const response = await fetch(`/api/characters?page=${pagina}&limit=4`);
    const datos = await response.json();
    console.log("DATOS DE PAGINAR: "+datos)
    let traitsHTML = "";

    for(let index=0;index<datos.data.length;index++){
      console.log("datos de la respuesta:"+datos.data[index].name);
      let element=datos.data[index];
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
    }

  } catch (error) {
      console.error("Error:"+error)
  }

}

async function infoModal(id_episodio) {

  const contenedor = document.getElementById("box");
  try {
    const response = await fetch(`/api/episodes/${id_episodio}`);
    const datos = await response.json();
     contenedor.innerHTML = ` 
                                  <h3 class="text-lg font-bold">${datos.title}</h3>
                                    <p class="py-4">${datos.summary}</p>
                                     <h3 class="text-lg font-bold">Personajes</h3>
                                `;

  for (let index = 0; index < datos.characters.length; index++) {
    contenedor.innerHTML += `        
                                      <ul>
                                          <li>
                                              ${datos.characters[index].name}
                                          </li>
                                      </ul>`;

  }

  contenedor.innerHTML += `   <div class="modal-action">
                                        <form method="dialog">
                                            <button class="btn">Close</button>
                                        </form>
                                    </div>`;

  document.getElementById('my_modal').showModal();
    

  } catch (error) {
    console.log("Error peticion datos modal: " + error);
  }


 

}

function validateCreateEpisode() {

  const form = document.getElementById('episodeForm');

  form.addEventListener('submit', (e) => {

    const titleInput = document.getElementById('title');
    const errorTitle = document.getElementById('error-title');

    const codeInput = document.querySelector('input[name="code"]');
    const errorCode = document.getElementById('error-code');
    const patron =new RegExp(/^S\d{2}E\d{2}$/i);

    const yearInput = document.querySelector('input[name="year"]');
    const errorYear = document.getElementById('error-year');

    const summaryInput = document.querySelector('textarea[name="summary"]');
    const errorSummary = document.getElementById('error-summary');
    const errorCheckbox = document.getElementById('error-checkbox');

    const selectedCharacters = form.querySelectorAll('input[name="characterIds"]:checked');
    e.preventDefault();

    let isValid = true;

    if (titleInput.value.trim().length < 3) {

      errorTitle.textContent = 'El título es obligatorio y debe tener al menos 3 caracteres';
      errorTitle.classList.remove('hidden', 'validator-hint');
      errorTitle.style.display = 'block';
      titleInput.classList.add('input-error');
      isValid = false;
    }

    if (codeInput.value.trim() === "") {

      if (errorCode) {
        errorCode.textContent = 'El código del episodio es obligatorio o no cumple el patron';
        errorCode.style.display = 'block';
      }
      codeInput.classList.add('input-error');
      isValid = false;
    }

    if(!patron.test(codeInput.value)){
      if (errorCode) {
        errorCode.textContent = 'El codigo no cumple el patron';
        errorCode.style.display = 'block';
      }
      codeInput.classList.add('input-error');
      isValid = false;
    }

    const yearValue = parseInt(yearInput.value);
    if (isNaN(yearValue) || yearValue < 2020 || yearValue > 2026) {

      if (errorYear) {
        errorYear.textContent = 'Introduce un año válido entre 2020 y 2026';
        errorYear.style.display = 'block';
      }
      yearInput.classList.add('input-error');
      isValid = false;
    }

    if (summaryInput.value.trim().length < 10) {

      if (errorSummary) {
        errorSummary.textContent = 'El resumen debe tener al menos 10 caracteres';
        errorSummary.style.display = 'block';
      }
      summaryInput.classList.add('textarea-error');
      isValid = false;
    }

    if (selectedCharacters.length === 0) {

      if (errorCheckbox) {
        errorCheckbox.textContent = 'Debes selecionar al menos un personaje';
        errorCheckbox.style.display = 'block';
      }

      isValid = false;

    }

    if (isValid) {
      form.submit();
    }
  });

}

//MODAL DE CONFIRMACIÓN USANDO EL PLUGIN DaisyUI
function pedirConfirmacion() {
  const modal = document.getElementById("modal_confirmacion");
  const btnSi = document.getElementById("btn_si");
  const btnNo = document.getElementById("btn_no");

  return new Promise((resolve) => {
    modal.showModal();

    // si el btn si es pulsado guardamos en la respuesta de la promesa true y vs con el btn no
    btnSi.onclick = () => {
      modal.close();
      resolve(true);
    };
    btnNo.onclick = () => {
      modal.close();
      resolve(false);
    };

    // Si cierran con ESC, devolvemos false
    modal.onclose = () => resolve(false);
  });
}//DEVUELVE UNA PROMESA: no devuelve el resultado al momento, porque el usuario todavía no ha pulsado nada.

async function deleteEpisode(id, botonPulsado) {

  const confirmado = await pedirConfirmacion(); //Ver más abajo

  if (!confirmado) {
    console.log("Borrado cancelado por el usuario.");
    return;
  }
  try {
    console.log("dentro de la petcion");
    const response = await fetch(`/api/delete/${id}`);

    /*
    Para usar una ruta DELETE:
    const response = await fetch(`/api/delete/${id}`, {
    method: "DELETE"
    });
    */

    //NO TE PUEDES OLVIDAR DE ESTO AL USAR FETCH:
    const data = await response.json();

    if (response.ok) {
      console.log("Respuesta del servidor:", data.message);
      // primero el td y luego el tr
      const fila = botonPulsado.parentNode.parentNode;
      if (fila) {
        fila.remove();
      }
    } else {
      console.error("Error al borrar");
    }
  } catch (error) {
    console.log("error" + error);
  }


}



document.addEventListener('DOMContentLoaded', () => {
  console.log("Hola: El DOM está listo");

  if (document.getElementById('episodeForm')) {
    validateCreateEpisode();
  }

});