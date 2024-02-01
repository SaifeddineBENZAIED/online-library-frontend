import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationRequest } from 'src/app/dto/authentication-request';
import { AuthenticationResponse } from 'src/app/dto/authentication-response';
import { ClientDto } from 'src/app/dto/client-dto';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { ClientFournisseurService } from 'src/app/services/client-fournisseur/client-fournisseur.service';

@Component({
  selector: 'app-page-login-client',
  templateUrl: './page-login-client.component.html',
  styleUrls: ['./page-login-client.component.scss']
})
export class PageLoginClientComponent implements OnInit{
  password: string = '';
  showPassword: boolean = false;

  authenticationRequest: AuthenticationRequest = {
    email: '',
    motDePasse: ''
  };
  errorMessage = '';

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private clientService: ClientFournisseurService
  ){

  }

  ngOnInit(): void{
  }

  login() {
    this.authenticationService.loginClient(this.authenticationRequest).subscribe({
      next: (data) => {
        if (data) {
          if (data instanceof Blob){
            this.handleBlobResponse(data);
          }else{
            this.handleAuthenticationResponse(data);
          }
        }
      },
      error: (error) => {
        this.errorMessage = 'Email et/ou mot de passe incorrect';
      }
    });
  }

  private handleBlobResponse(blob: Blob) {
    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target) {
        const responseText = event.target.result as string;
        const jsonResponse = JSON.parse(responseText) as AuthenticationResponse;
        this.handleAuthenticationResponse(jsonResponse);
      } else {
        console.error("Error reading Blob response: event.target is null.");
      }
    };
    reader.readAsText(blob);
  }

  private handleAuthenticationResponse(authenticationResponse: AuthenticationResponse) {
    if (authenticationResponse) {
      this.authenticationService.setConnectedPerson(authenticationResponse);
      this.clientService.findByEmailClient(this.authenticationRequest.email!).subscribe(
        (client: ClientDto) => {
          if (client){

            this.authenticationService.setPerson(client);
          }
        }
      );
      if(localStorage.getItem('isuser') && localStorage.getItem('isuser') === 'true'){
        localStorage.removeItem('isuser');
      }
      localStorage.setItem('isclient','true');
      this.router.navigate(['']);
    } else {
      this.errorMessage = 'Unexpected response from the server';
    }
  }
}
