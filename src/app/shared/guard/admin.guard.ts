import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const adminGuard: CanActivateFn = (route, state) => {
  const user: any = JSON.parse(localStorage.getItem('shopUser'));
  if (!user || user.user.role != 'ADMIN') {
    const router = inject(Router);
    router.navigate(['menu/categories'])
    return false;
  }
  return true;
};
