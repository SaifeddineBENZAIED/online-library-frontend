import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthenticationRequest } from 'src/app/dto/authentication-request';
import { AuthenticationResponse } from 'src/app/dto/authentication-response';
import { ClientDto } from 'src/app/dto/client-dto';
import { UserDto } from 'src/app/dto/user-dto';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private baseUrl = 'http://localhost:3000/auth';

  constructor(private http: HttpClient) {}

  register(userDto: UserDto): Observable<AuthenticationResponse> {
    return this.http.post<AuthenticationResponse>(`${this.baseUrl}/register`, userDto);
  }

  login(loginDto: AuthenticationRequest): Observable<AuthenticationResponse> {
    return this.http.post<AuthenticationResponse>(`${this.baseUrl}/login`, loginDto);
  }

  refreshToken(token: string): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post<any>(`${this.baseUrl}/refresh`, {}, { headers });
  }

  logout(token: string): Observable<void> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.put<void>(`${this.baseUrl}/logout`, {}, { headers });
  }

  registerClient(clientDto: ClientDto): Observable<AuthenticationResponse> {
    return this.http.post<AuthenticationResponse>(`${this.baseUrl}/register-client`, clientDto);
  }

  loginClient(loginDto: AuthenticationRequest): Observable<AuthenticationResponse> {
    return this.http.post<AuthenticationResponse>(`${this.baseUrl}/login-client`, loginDto);
  }

  refreshTokenClient(token: string): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post<any>(`${this.baseUrl}/refresh-client`, {}, { headers });
  }

  logoutClient(token: string): Observable<void> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.put<void>(`${this.baseUrl}/logout-client`, {}, { headers });
  }

  /*setConnectedUser(authentificationResponse: any): void{
    localStorage.setItem("connectedUser", JSON.stringify(authentificationResponse));
  }

  setUtilisateur(utilisateurDto: any): void {
    const utilisateurJson = JSON.stringify(utilisateurDto);
    localStorage.setItem('utilisateur', utilisateurJson);
  }
  
  getUtilisateur() {
    const utilisateurJson = localStorage.getItem('utilisateur');
  
    if (utilisateurJson) {
      const utilisateurDto = JSON.parse(utilisateurJson);
      return utilisateurDto;
    } else {
      console.log('UtilisateurDto not found in local storage.');
      return {};
    }
  }

  setConnectedClient(authentificationResponse: any): void{
    localStorage.setItem("connectedClient", JSON.stringify(authentificationResponse));
  }

  setClient(clientDto: any): void {
    const clientDtoJson = JSON.stringify(clientDto);
    localStorage.setItem('client', clientDtoJson);
  }
  
  getClient() {
    const clientJson = localStorage.getItem('client');
  
    if (clientJson) {
      const utilisateurDto = JSON.parse(clientJson);
      return utilisateurDto;
    } else {
      console.log('ClientDto not found in local storage.');
      return {};
    }
  }*/

  setConnectedPerson(authentificationResponse: AuthenticationResponse): void{
    localStorage.setItem("connectedPerson", JSON.stringify(authentificationResponse));
  }

  getConnectedPerson() {
    const connectedPersonJson = localStorage.getItem('connectedPerson');
  
    if (connectedPersonJson) {
      const connectedPerson = JSON.parse(connectedPersonJson) as AuthenticationResponse;
      return connectedPerson;
    } else {
      console.log('connectedPerson not found in local storage.');
      return {};
    }
  }

  setPerson(person: UserDto | ClientDto): void {
    const personJson = JSON.stringify(person);
    localStorage.setItem('person', personJson);
  }
  
  getPerson() {
    const personJson = localStorage.getItem('person');
  
    if (personJson) {
      const person = JSON.parse(personJson);
      return person;
    } else {
      console.log('person not found in local storage.');
      return {};
    }
  }
}
