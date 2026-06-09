import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';

import { StorageService } from '../services/storage-service';
import { Router } from '@angular/router';


export const authGuard: CanActivateFn = (route, state) => {
  const local = inject(StorageService);
  const router = inject(Router);

  if (local.isAuthenticated()) {
    return true; // Allow access
  }

  // Redirect to login
  router.navigate(['/']);
  return false; // Block access
};

