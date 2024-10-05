import { CanActivateFn } from '@angular/router';

export const gaurdGuard: CanActivateFn = (route, state) => {
  return true;
};
