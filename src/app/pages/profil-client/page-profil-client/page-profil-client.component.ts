import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClientDto } from 'src/app/dto/client-dto';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { ClientFournisseurService } from 'src/app/services/client-fournisseur/client-fournisseur.service';

@Component({
  selector: 'app-page-profil-client',
  templateUrl: './page-profil-client.component.html',
  styleUrls: ['./page-profil-client.component.scss']
})
export class PageProfilClientComponent implements OnInit{

  client: ClientDto = {};
  nomComplet = '';

  constructor(private router: Router, private clientService: ClientFournisseurService, private authService: AuthenticationService){}
  
  ngOnInit(): void {
    this.client = this.authService.getPerson() as ClientDto;
    this.nomComplet = this.client.nom! + ' ' + this.client.prenom! ;
  }

  changePassword(): void {
    this.router.navigate(['changerMDPclient']);
  }

  modifierClient() : void {
    this.router.navigate(['nouveauclient', this.client.id]);
  }
}
