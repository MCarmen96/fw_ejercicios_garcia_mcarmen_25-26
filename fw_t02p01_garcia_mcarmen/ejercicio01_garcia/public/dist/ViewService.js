export class ViewService {
    pintarRecetasHome(recetas, contenedor) {
        //variable vacía para ir guardando los ingredientes
        let listaIngredientes = "";
        //recorro el array de ingredientes y y cojo cada elemento y la voy añadiendo a mi varaible
        recetas.ingredients.forEach(ing => {
            listaIngredientes += `<li>${ing.name} - <small>${ing.measure}</small></li>`;
        });
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
                </div>
            </div>`;
    }
}
/*
    todo RESPONSABILIDADES
    Renderizar listados de recetas
    Renderizar detalles de receta
    Renderizar planes semanales
    Mostrar mensajes de error o aviso

    Las funciones siempre reciben el elemento contenedor del DOM y los datos a representar.


*/ 
//# sourceMappingURL=ViewService.js.map