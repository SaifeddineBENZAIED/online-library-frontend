import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationResponse } from 'src/app/dto/authentication-response';
import { UserDto } from 'src/app/dto/user-dto';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { UserService } from 'src/app/services/user/user.service';
import { Role } from "src/app/dto/role";

@Component({
  selector: 'app-page-inscription',
  templateUrl: './page-inscription.component.html',
  styleUrls: ['./page-inscription.component.scss']
})
export class PageInscriptionComponent implements OnInit {
  password1: string = '';
  password2: string = '';
  showPassword1: boolean = false;
  showPassword2: boolean = false;
  userDto: UserDto = {};
  errorMessages: Array<String>= [];
  roleValues: Array<Role>= [Role.USER, Role.ADMIN];
  role: Role | null = null;

  togglePasswordVisibility1() {
    this.showPassword1 = !this.showPassword1;
  }
  togglePasswordVisibility2() {
    this.showPassword2 = !this.showPassword2;
  }

  constructor(
    private authService: AuthenticationService,
    private userService: UserService,
    private router: Router
  ){

  }

  ngOnInit(): void{

  }

  inscrire(): void{
    console.log(this.userDto);
    if(this.userDto.motDePasse === this.password2 && this.role){
      this.userDto.role = this.role;
      this.authService.register(this.userDto).subscribe({
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
      this.errorMessages = ["Veuillez remplir et/ou verifier tous les champs SVP" , "Verifier la confirmation de votre mot de passe et/ou le choix de role SVP"];
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
      this.userService.findUserByEmail(this.userDto.email!).subscribe(
        utilisateur => {
          this.authService.setPerson(utilisateur);
        }
      );
      if(localStorage.getItem('isclient') && localStorage.getItem('isclient') === 'true'){
        localStorage.removeItem('isclient');
      }
      localStorage.setItem('isuser','true');
      this.router.navigate(['profil']);
    }
  }
}
