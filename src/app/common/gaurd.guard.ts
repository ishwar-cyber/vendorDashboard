import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const gaurdGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  if((localStorage.getItem('customerId')!==null)|| (localStorage.getItem('vendorId')!==null)){
    return true;
  }
  router.navigate(['/website']);
  return false;
}
