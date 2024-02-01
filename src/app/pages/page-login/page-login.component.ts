import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationRequest } from 'src/app/dto/authentication-request';
import { AuthenticationResponse } from 'src/app/dto/authentication-response';
import { UserDto } from 'src/app/dto/user-dto';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-page-login',
  templateUrl: './page-login.component.html',
  styleUrls: ['./page-login.component.scss']
})
export class PageLoginComponent implements OnInit{
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
    private userService: UserService
  ){

  }

  ngOnInit(): void{
  }

  login() {
    this.authenticationService.login(this.authenticationRequest).subscribe({
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
      this.userService.findUserByEmail(this.authenticationRequest.email!).subscribe(
        (user: UserDto) => {
          console.log(user);
          if (user){

            this.authenticationService.setPerson(user);
          }
        }
      );
      if(localStorage.getItem('isclient') && localStorage.getItem('isclient') === 'true'){
        localStorage.removeItem('isclient');
      }
      localStorage.setItem('isuser','true');
      this.router.navigate(['']);
    } else {
      this.errorMessage = 'Unexpected response from the server';
    }
  }
}
