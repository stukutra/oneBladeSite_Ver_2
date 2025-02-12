import { CanActivateFn, Router } from '@angular/router';

import { inject } from '@angular/core';

export const RedirectGuard: CanActivateFn = () => {
  const router = inject(Router);
  router.navigate(['/']); // Reindirizza alla home
  return false;
};