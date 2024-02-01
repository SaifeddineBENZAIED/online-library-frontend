import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";

export const userRoleGuard: CanActivateFn = (route, state) => {
    const token = localStorage.getItem('isuser');

    const router = inject(Router);
  
    if(token && token === 'true'){
      return true;
    }else{
      router.navigate(['']);
      return false;
    }
};