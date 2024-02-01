import { Component, OnInit } from '@angular/core';
import { ClientDto } from 'src/app/dto/client-dto';
import { UserDto } from 'src/app/dto/user-dto';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { ClientFournisseurService } from 'src/app/services/client-fournisseur/client-fournisseur.service';
import { TokenService } from 'src/app/services/token/token.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  person: any = {};
  isUser = true;

  constructor(
    private authService: AuthenticationService
  ){}

  ngOnInit(): void{
    if(localStorage.getItem('isclient') && localStorage.getItem('isclient') === 'true'){
      this.isUser = false;
      this.person = this.authService.getPerson() as ClientDto;
    }else{
      this.isUser = true;
      this.person = this.authService.getPerson() as UserDto;
    }
  }
}
