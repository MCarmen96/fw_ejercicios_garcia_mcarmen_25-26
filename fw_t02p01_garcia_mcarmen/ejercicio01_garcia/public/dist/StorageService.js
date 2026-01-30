export class StorageService {
    saveUser(user) {
        localStorage.setItem(StorageService.USER_KEY_ITEM, JSON.stringify(user));
    }
    getEmailUser(email) {
        const usersDatos = localStorage.getItem(StorageService.USER_KEY_ITEM); //DEVUELVE EL VALOR DE LA CLAVE USER EN STRING
        if (!usersDatos) {
            return false;
        } //si no esta esa clave
        try {
            const userList = JSON.parse(usersDatos); // convierto el texto en un array de objetos user
            console.log(userList);
            return userList.some(user => user.email === email);
        }
        catch (error) {
            return false;
        }
    }
}
/*
        USER_KEY_ITEM, USER_MEAL_KEY_ITEM, …

        Responsabilidades
        Alta y validación de usuarios
        Gestión de sesión
        Guardar y recuperar recetas del usuario
        Guardar y recuperar planes semanales
        Guardar preferencias del usuario
        …

        Nunca toca el DOM
*/
StorageService.USER_KEY_ITEM = "users";
StorageService.USER_MEAL_KEY_ITEM = "userMeals_"; //Clave: userMeals_56 + el id del user
StorageService.USER_MINI_MEAL_KEY_ITEM = "userMiniMeals_"; // tambien con el id del usuario
StorageService.USER_WEEKLY_PLANS = "weeklyPlans_"; // tmabien con el id
//# sourceMappingURL=StorageService.js.map