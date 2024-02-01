import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../authentication/authentication.service';
import { Router } from '@angular/router';
import { TokenDto } from 'src/app/dto/token-dto';
import { UserDto } from 'src/app/dto/user-dto';
import { ClientDto } from 'src/app/dto/client-dto';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  private apiUrl = 'http://localhost:3000/token';

  constructor(private http: HttpClient, private authService: AuthenticationService, private router: Router) {}

  createUserToken(tokenData: TokenDto): Observable<TokenDto> {
    return this.http.post<TokenDto>(`${this.apiUrl}/create/user-token`, tokenData);
  }

  createClientToken(tokenData: TokenDto): Observable<TokenDto> {
    return this.http.post<TokenDto>(`${this.apiUrl}/create/client-token`, tokenData);
  }

  getTokensByUserId(id: number): Observable<TokenDto[]> {
    return this.http.get<TokenDto[]>(`${this.apiUrl}/find/user-tokens/${id}`);
  }

  getTokensByClientId(clientId: number): Observable<TokenDto[]> {
    return this.http.get<TokenDto[]>(`${this.apiUrl}/find/client-tokens/${clientId}`);
  }

  getTokenByTokenString(tokenString: string): Observable<TokenDto | undefined> {
    return this.http.get<TokenDto | undefined>(`${this.apiUrl}/find/${tokenString}`);
  }

  saveMultipleTokens(tokens: TokenDto[]): Observable<TokenDto[]> {
    return this.http.put<TokenDto[]>(`${this.apiUrl}/save/all`, tokens);
  }

  isTokenTypeIsUser(token: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.apiUrl}/type-token/${token}`);
  }

  validateToken(token: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.apiUrl}/validate/${token}`);
  }

  isAccessTokenValid(): boolean{
    const tokens = this.authService.getConnectedPerson();
    if (tokens && tokens.accessToken){
      /*this.validateToken(tokens.accessToken).subscribe(
        res => {
          if(res === true){
            return true;
          }else{
            this.router.navigate(['accueil']);
            return false;
          }
        }
      );*/
      return true;
    }
    this.router.navigate(['accueil']);
    return false;
  }

  findUserByToken(token: string): Observable<UserDto> {
    return this.http.get<UserDto>(`${this.apiUrl}/find-user/${token}`);
  }

  findClientByToken(token: string): Observable<ClientDto> {
    return this.http.get<ClientDto>(`${this.apiUrl}/find-client/${token}`);
  }
}
