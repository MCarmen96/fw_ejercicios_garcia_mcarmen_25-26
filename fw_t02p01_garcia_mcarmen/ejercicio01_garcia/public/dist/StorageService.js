export class StorageService {
    constructor() {
        if (!localStorage.getItem(StorageService.USER_KEY_ITEM) && !localStorage.getItem(StorageService.USER_MEAL_KEY_ITEM) && !localStorage.getItem(StorageService.USER_MINI_MEAL_KEY_ITEM) && !localStorage.getItem(StorageService.USER_WEEKLY_PLANS)) {
            localStorage.setItem(StorageService.USER_KEY_ITEM, JSON.stringify([]));
            localStorage.setItem(StorageService.USER_MEAL_KEY_ITEM, JSON.stringify([]));
            localStorage.setItem(StorageService.USER_MINI_MEAL_KEY_ITEM, JSON.stringify([]));
            localStorage.setItem(StorageService.USER_WEEKLY_PLANS, JSON.stringify([]));
        }
    }
    // cojo los usuarios del local storage y los devuelvo mejor hacerlo
    getUsers() {
        const users = localStorage.getItem(StorageService.USER_KEY_ITEM);
        if (users != null) {
            return users ? JSON.parse(users) : []; // devuelvo el array
            /* La función JSON.parse() toma una cadena de texto que tiene formato JSON
            (un formato estándar para guardar e intercambiar información)
            y la transforma en un objeto o array real de JavaScript/TypeScript. */
        }
        else {
            return false;
        }
    }
    saveUser(user) {
        let ok = true;
        let usersArray = this.getUsers();
        if (Array.isArray(usersArray)) {
            usersArray.push(user);
        }
        else {
            ok = false;
        }
        // aqui guardo el objeto en el array
        // guardo en el local storage cogiendo la clave que e interesa que es la de users
        if (ok) {
            try {
                localStorage.setItem(StorageService.USER_KEY_ITEM, JSON.stringify(usersArray)); //y ahora aqui lo guardo en storage sobreescribiendo
            }
            catch (error) {
                console.error(error);
                ok = false;
            }
        }
        return ok;
    }
    getEmailUser(email) {
        let users = this.getUsers();
        let ok = true;
        try {
            if (users && Array.isArray(users)) {
                return users.some(user => user.email === email);
            }
        }
        catch (error) {
            return false;
        }
        return ok;
    }
    getPasswordUser(password) {
        let users = this.getUsers();
        let ok = true;
        try {
            if (users && Array.isArray(users)) {
                return users.some(user => user.password === password);
            }
        }
        catch (error) {
            return false;
        }
        return ok;
    }
    getLastUser() {
        let user = this.getUsers();
        let id = 0;
        if (user && Array.isArray(user)) { // mira si hay algun user
            if (user.length == 0) {
                return 1;
            }
            else {
                let lastIndex = user.length - 1; //cojo el ultimo indice
                let lastUser = user[lastIndex]; // accedo al objeto que esta en esa posicion
                id = lastUser.id + 1; //devuelvo su indice + 1 
            }
        }
        else {
            console.log("fallo al recoger los datos de la clave user del localstorage");
        }
        return id;
    }
    isLoginUser() {
        let users = this.getUsers();
        let userLogin = null;
        if (Array.isArray(users)) {
            users.forEach(user => {
                if (user.login) {
                    userLogin = user.name;
                }
            });
        }
        return userLogin;
    }
    activeLogin(email) {
        let users = this.getUsers();
        if (Array.isArray(users)) {
            users.forEach(user => {
                if (user.email == email) {
                    user.login = true;
                }
            });
        }
        localStorage.setItem(StorageService.USER_KEY_ITEM, JSON.stringify(users));
        console.log(`Estado de login actualizado en LocalStorage para: ${email}`);
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