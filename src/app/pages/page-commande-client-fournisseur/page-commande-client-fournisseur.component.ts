import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommandeClientDto } from 'src/app/dto/commande-client-dto';
import { CommandeFournisseurDto } from 'src/app/dto/commande-fournisseur-dto';
import { LigneCommandeClientDto } from 'src/app/dto/ligne-commande-client-dto';
import { CmdClientFournisseurPaginationService } from 'src/app/services/cmd-client-fournisseur-pagination/cmd-client-fournisseur-pagination.service';
import { CommandeClientFournisseurService } from 'src/app/services/commande-client-fournisseur/commande-client-fournisseur.service';

@Component({
  selector: 'app-page-commande-client-fournisseur',
  templateUrl: './page-commande-client-fournisseur.component.html',
  styleUrls: ['./page-commande-client-fournisseur.component.scss']
})
export class PageCommandeClientFournisseurComponent implements OnInit {

  origin = '';
  path = 'nouvellecommande';
  listeCommandes: Array<any> = [];
  mapLignesCommande: Map<number, Array<any>> = new Map();
  mapPrixTotalCommande: Map<number, number> = new Map();
  errorMsg= '';
  paginatedCmds: Array<any> = [];
  itemsPerPage: number = 5;
  currentPage: number = 1;

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private commandeClientFournisseurService: CommandeClientFournisseurService, private cmdCltFrsPagination: CmdClientFournisseurPaginationService){
    
  }

  ngOnInit(): void{
    this.activatedRoute.data.subscribe(data => {
      this.origin = data['origin'];
    });
    this.findAllCommandes();
  }

  findAllCommandes(): void {
    if (this.origin === 'client') {
      this.commandeClientFournisseurService.findAllCC()
      .subscribe(cmd => {
        if(cmd.length > 0){
          this.listeCommandes = cmd as Array<CommandeClientDto>;
          this.cmdCltFrsPagination.setListcmd(this.listeCommandes);
          this.paginatedCmds = this.cmdCltFrsPagination.getPaginatedcmds(this.currentPage);
          this.findAllLignesCommande();
        }else{
          this.errorMsg = 'Pas de commandes client';
        }
      });
    } else if (this.origin === 'fournisseur') {
      this.commandeClientFournisseurService.findAllCF()
      .subscribe(cmd => {
        if(cmd.length > 0){
          this.listeCommandes = cmd as Array<CommandeFournisseurDto>;
          this.cmdCltFrsPagination.setListcmd(this.listeCommandes);
          this.paginatedCmds = this.cmdCltFrsPagination.getPaginatedcmds(this.currentPage);
          this.findAllLignesCommande();
        }else{
          this.errorMsg = 'Pas de commandes fournisseur';
        }
      });
    }
  }

  findAllLignesCommande(): void {
    this.listeCommandes.forEach(cmd => {
     this.findLignesCommande(cmd.id);
    });
  }

  findLignesCommande(idCommande: number): void {
    if (this.origin === 'client') {
      this.commandeClientFournisseurService.findAllLignesCC(idCommande)
      .subscribe(list => {
        this.mapLignesCommande.set(idCommande, list);
        this.mapPrixTotalCommande.set(idCommande, this.calculerTotalCmd(list));
      });
    } else if (this.origin === 'fournisseur') {
      this.commandeClientFournisseurService.findAllLignesCF(idCommande)
      .subscribe(list => {
        this.mapLignesCommande.set(idCommande, list);
        this.mapPrixTotalCommande.set(idCommande, this.calculerTotalCmd(list));
      });
    }
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
    this.activatedRoute.data.subscribe(data => {
      this.origin = data['origin'];
    });
    this.path = this.path + this.origin;
    this.router.navigate([this.path]);
  }

  handleSuppression(event: any): void {
    if (event === 'success') {
      this.findAllCommandes();
    } else {
      this.errorMsg = event;
    }
  }

  onPageChange(pageNumber: number): void {
    this.currentPage = pageNumber;
    this.cmdCltFrsPagination.onPageChange(pageNumber);
    this.paginatedCmds = this.cmdCltFrsPagination.getPaginatedcmds(pageNumber);
  }
}
