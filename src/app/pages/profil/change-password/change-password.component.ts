import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ChangePasswordDto } from 'src/app/dto/change-password-dto';
import { UserDto } from 'src/app/dto/user-dto';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {

  password1: string = '';
  showPassword1: boolean = false;
  password2: string = '';
  showPassword2: boolean = false;
  password3: string = '';
  showPassword3: boolean = false;

  errorMsg = '';

  oldPassword = '';
  changerPasswordDto: ChangePasswordDto = {};
  user: UserDto = {};

  constructor(private router: Router , private userService: UserService, private authService: AuthenticationService){}

  ngOnInit(): void {
    /*if(localStorage.getItem('origin') && localStorage.getItem('origin') === 'inscription'){
      this.oldPassword = 'som3R@nd0mP@$$word$2a$10$uV3uYOSHhKAWXj0kmq1kuZrS8mGrY6NOcxS5hkgjQr5AAp1mm0LK';
      localStorage.removeItem('origin');
    }*/
    this.user = this.authService.getPerson() as UserDto;
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
    this.router.navigate(['profil']);
  }

  changePassword(): void {
    const user = this.authService.getPerson() as UserDto;
    if(user.motDePasse !== this.oldPassword){
      this.errorMsg = 'Verifier votre mot de passe actuel';
    }else{
      this.changerPasswordDto.id = user.id;
      this.userService.changePassword(this.changerPasswordDto).subscribe(
        data => {
          this.router.navigate(['profil']);
        }
      );
    }
  }
}
