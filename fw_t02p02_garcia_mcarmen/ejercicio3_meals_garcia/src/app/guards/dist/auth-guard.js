"use strict";
exports.__esModule = true;
exports.authGuard = void 0;
var core_1 = require("@angular/core");
var storage_service_1 = require("../services/storage-service");
var router_1 = require("@angular/router");
exports.authGuard = function (route, state) {
    var local = core_1.inject(storage_service_1.StorageService);
    var router = core_1.inject(router_1.Router);
    if (local.isAuthenticated()) {
        return true; // Allow access
    }
    // Redirect to login
    router.navigate(['/']);
    return false; // Block access
};
