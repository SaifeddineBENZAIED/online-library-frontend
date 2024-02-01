import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { TokenService } from './services/token/token.service';

export const authGuard: CanActivateFn = (route, state) => {
  /*const token = localStorage.getItem('connectedUser');
  console.log(route);
  console.log(state);
  const router = inject(Router);
  console.log('Im in auth guard');
  console.log('token', token);
  if(token) {
    return true;
  } else {
    router.navigate(['login']);
    return false;
  }*/
  const tokenService = inject(TokenService);

  if(tokenService.isAccessTokenValid() === true){
    return true;
  }else{
    return false;
  }
};
