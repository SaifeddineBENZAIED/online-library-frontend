import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientDto } from 'src/app/dto/client-dto';
import { CommandeClientDto } from 'src/app/dto/commande-client-dto';
import { LigneCommandeClientDto } from 'src/app/dto/ligne-commande-client-dto';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { CommandeClientFournisseurService } from 'src/app/services/commande-client-fournisseur/commande-client-fournisseur.service';

@Component({
  selector: 'app-page-cmd-for-client',
  templateUrl: './page-cmd-for-client.component.html',
  styleUrls: ['./page-cmd-for-client.component.scss']
})
export class PageCmdForClientComponent {

  client: ClientDto = {};
  listeCommandes: Array<CommandeClientDto> = [];
  mapLignesCommande: Map<number, Array<LigneCommandeClientDto>> = new Map();
  mapPrixTotalCommande: Map<number, number> = new Map();
  errorMsg= '';
  origin= 'client';

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private authService: AuthenticationService, private commandeClientService: CommandeClientFournisseurService){
    
  }

  ngOnInit(): void{
    this.client = this.authService.getPerson() as ClientDto; 
    this.findAllCommandes();
  }

  findAllCommandes(): void {
    this.commandeClientService.findAllCCByClientId(this.client.id!)
      .subscribe(cmd => {
        if(cmd.length > 0){
          this.listeCommandes = cmd as Array<CommandeClientDto>;
          this.findAllLignesCommande();
        }else{
          this.errorMsg = 'Pas de commandes client';
        }
      });
  }

  findAllLignesCommande(): void {
    this.listeCommandes.forEach(cmd => {
     this.findLignesCommande(cmd.id!);
    });
  }

  findLignesCommande(idCommande: number): void {
    this.commandeClientService.findAllLignesCC(idCommande)
      .subscribe(list => {
        this.mapLignesCommande.set(idCommande, list);
        this.mapPrixTotalCommande.set(idCommande, this.calculerTotalCmd(list));
      });
  }

  calculerTotalCmd(list: Array<LigneCommandeClientDto>): number {
    let total = 0;
    list.forEach(ligne => {
      if (ligne.prixUnitaire && ligne.quantite) {
        total += +ligne.quantite * +ligne.prixUnitaire;
      }
    });
    return Math.floor(total);
  }

  calculerTotalCommande(id: number): number {
    return this.mapPrixTotalCommande.get(id) ?? 0;
  }

  nouvelleCommande(): void {
    this.router.navigate(['achat', this.client.id]);
  }

  /*handleSuppression(event: any): void {
    if (event === 'success') {
      this.findAllCommandes();
    } else {
      this.errorMsg = event;
    }
  }*/

  modifierClick(cmd: CommandeClientDto): void {
    this.activatedRoute.data.subscribe(data => {
      this.origin = data['origin'];
    });
    this.router.navigate(['modifiercommandeclient', cmd.id, this.client.id]);
  }

  confSuppressionCmd(cmd: CommandeClientDto): void {
    if(cmd.id){
      this.commandeClientService.deleteCC(cmd.id).subscribe({
        next: (result) => {
          this.findAllCommandes();
        }, error: (error) => {
          this.errorMsg = error;
        }
      });
    }
  }
}
