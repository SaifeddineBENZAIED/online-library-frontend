import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ChangePasswordDto } from 'src/app/dto/change-password-dto';
import { ClientDto } from 'src/app/dto/client-dto';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { ClientFournisseurService } from 'src/app/services/client-fournisseur/client-fournisseur.service';

@Component({
  selector: 'app-change-password-client',
  templateUrl: './change-password-client.component.html',
  styleUrls: ['./change-password-client.component.scss']
})
export class ChangePasswordClientComponent implements OnInit {

  password1: string = '';
  showPassword1: boolean = false;
  password2: string = '';
  showPassword2: boolean = false;
  password3: string = '';
  showPassword3: boolean = false;

  errorMsg = '';

  oldPassword = '';
  changerPasswordDto: ChangePasswordDto = {};
  client: ClientDto = {};

  constructor(private router: Router , private clientService: ClientFournisseurService, private authService: AuthenticationService){}

  ngOnInit(): void {
    this.client = this.authService.getPerson() as ClientDto;
  }

  togglePasswordVisibility1() {
    this.showPassword1 = !this.showPassword1;
  }

  togglePasswordVisibility2() {
    this.showPassword2 = !this.showPassword2;
  }

  togglePasswordVisibility3() {
    this.showPassword3 = !this.showPassword3;
  }

  cancelClick(): void {
    this.router.navigate(['profilclient']);
  }

  changePassword(): void {
    const client = this.authService.getPerson() as ClientDto;
    if(client.motDePasse !== this.oldPassword){
      this.errorMsg = 'Verifier votre mot de passe actuel';
    }else{
      this.changerPasswordDto.id = client.id;
      this.clientService.changePasswordClient(this.changerPasswordDto).subscribe(
        data => {
          this.router.navigate(['profilclient']);
        }
      );
    }
  }
}
