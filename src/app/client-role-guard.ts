import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";

export const clientRoleGuard: CanActivateFn = (route, state) => {
    const token = localStorage.getItem('isclient');

    const router = inject(Router);
  
    if(token && token === 'true'){
      return true;
    }else{
      router.navigate(['']);
      return false;
    }
};