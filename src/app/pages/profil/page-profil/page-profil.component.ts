import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserDto } from 'src/app/dto/user-dto';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-page-profil',
  templateUrl: './page-profil.component.html',
  styleUrls: ['./page-profil.component.scss']
})
export class PageProfilComponent implements OnInit{

  user: UserDto = {};
  nomComplet = '';

  constructor(private router: Router, private userService: UserService, private authService: AuthenticationService){}
  
  ngOnInit(): void {
    this.user = this.authService.getPerson() as UserDto;
    this.nomComplet = this.user.nom! + ' ' + this.user.prenom! ;
  }

  changePassword(): void {
    this.router.navigate(['changermotdepasse']);
  }

  modifierUser() : void {
    this.router.navigate(['nouveauutilisateur', this.user.id]);
  }
}
