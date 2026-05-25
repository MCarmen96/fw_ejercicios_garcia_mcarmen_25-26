export class ViewService {
    pintarRecetasHome(recetas, contenedor, local) {
        //variable vacía para ir guardando los ingredientes
        let listaIngredientes = "";
        if (recetas.ingredients && recetas.ingredients != null) {
            //recorro el array de ingredientes y y cojo cada elemento y la voy añadiendo a mi varaible
            recetas.ingredients.forEach(ing => {
                listaIngredientes += `<li>${ing.name} - <small>${ing.measure}</small></li>`;
            });
        }
        contenedor.innerHTML += `
            <div class="col-12 col-md-6 col-lg-3">
                <div class="card shadow" >
                        <img src="${recetas.strMealThumb}" class="card-img-top" alt="${recetas.strMeal}">
                        <div class="card-body">
                            <h5 class="card-title">${recetas.strMeal}</h5>
                            <p class="card-text"> <strong>Categoría: </strong>${recetas.strCategory}</p>
                            <p class="card-text"><strong>Origen: </strong>${recetas.strArea}</p>
                            <h6>Ingredientes:</h6>
                                <ul style="max-height: 100px; overflow-y: auto;">
                                    ${listaIngredientes} 
                                </ul>
                        </div>
                        <button type="button" class="btn btn-outline-danger m-3 d-none " id="${recetas.idMeal}">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-heart" viewBox="0 0 16 16">
                                <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15"></path>
                            </svg>
                            Guardar receta
                        </button>
                </div>
            </div>`;
        this.cargarElementosLogin(local);
    }
    cargarCategoriasSelect(categorias, select) {
        // Limpiamos el selector
        select.innerHTML = '<option value="" selected disabled>Selecciona una categoría</option>';
        // Recorremos el ARRAY que recibimos
        categorias.forEach(cat => {
            const option = document.createElement("option");
            option.value = cat.strCategory;
            option.textContent = cat.strCategory;
            select.appendChild(option);
        });
    }
    cargarAlerts(contenedor, tipoAlert, mensajeAlerta) {
        contenedor.classList.add("alert", "alert-" + tipoAlert, "alert-dismissible", "fade", "show");
        contenedor.setAttribute("role", "alert");
        contenedor.innerHTML = " ";
        let mensageContent = document.createElement("p");
        mensageContent.textContent = mensajeAlerta;
        let buttonClose = document.createElement("button");
        buttonClose.classList.add("btn-close");
        buttonClose.setAttribute("data-bs-dismiss", "alert");
        contenedor.appendChild(mensageContent);
        contenedor.appendChild(buttonClose);
    }
    cargarElementosLogin(local) {
        const iconLogin = document.querySelector("#icon-login");
        const divNombreUser = document.querySelector("#nombreUser");
        const nombreUser = local.getSession();
        console.log(nombreUser);
        if (nombreUser != null) {
            if (document.querySelector("#recetasHome")) {
                document.querySelectorAll("#recetasHome button").forEach(buton => {
                    buton.classList.add("d-block");
                    buton.classList.remove("d-none");
                    iconLogin.classList.add("d-block");
                    iconLogin.classList.remove("d-none");
                    document.querySelector("#saveCategory")?.classList.remove("d-none");
                    document.querySelector("#saveCategory")?.classList.add("d-block");
                    divNombreUser.innerHTML = `<span>${nombreUser.name}</span>`;
                });
            }
        }
    }
}
/*
    todo RESPONSABILIDADES
    * Renderizar listados de recetas
    Renderizar detalles de receta
    Renderizar planes semanales
    Mostrar mensajes de error o aviso

    Las funciones siempre reciben el elemento contenedor del DOM y los datos a representar.


*/ 
//# sourceMappingURL=ViewService.js.map