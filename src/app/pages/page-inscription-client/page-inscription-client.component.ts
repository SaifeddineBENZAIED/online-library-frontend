import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationResponse } from 'src/app/dto/authentication-response';
import { ClientDto } from 'src/app/dto/client-dto';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { ClientFournisseurService } from 'src/app/services/client-fournisseur/client-fournisseur.service';

@Component({
  selector: 'app-page-inscription-client',
  templateUrl: './page-inscription-client.component.html',
  styleUrls: ['./page-inscription-client.component.scss']
})
export class PageInscriptionClientComponent implements OnInit {
  password1: string = '';
  password2: string = '';
  showPassword1: boolean = false;
  showPassword2: boolean = false;
  clientDto: ClientDto = {};
  errorMessages: Array<String>= [];

  togglePasswordVisibility1() {
    this.showPassword1 = !this.showPassword1;
  }
  togglePasswordVisibility2() {
    this.showPassword2 = !this.showPassword2;
  }

  constructor(
    private authService: AuthenticationService,
    private clientService: ClientFournisseurService,
    private router: Router
  ){

  }

  ngOnInit(): void{

  }

  inscrire(): void{
    if(this.clientDto.motDePasse === this.password2){
      this.authService.registerClient(this.clientDto).subscribe({
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
          this.errorMessages = ["Veuillez remplir et/ou verifier tous les champs SVP"];
        }
      });
    }else{
      this.errorMessages = ["Veuillez remplir et/ou verifier tous les champs SVP" , "Verifier la confirmation de votre mot de passe SVP"];
    }
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
      this.authService.setConnectedPerson(authenticationResponse);
      this.clientService.findByEmailClient(this.clientDto.email!).subscribe(
        client => {
          this.authService.setPerson(client);
        }
      );
      if(localStorage.getItem('isuser') && localStorage.getItem('isuser') === 'true'){
        localStorage.removeItem('isuser');
      }
      localStorage.setItem('isclient','true');
      this.router.navigate(['profilclient']);
    }
  }
}
