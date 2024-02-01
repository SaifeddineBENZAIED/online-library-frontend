import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommandeClientDto } from 'src/app/dto/commande-client-dto';
import { CommandeFournisseurDto } from 'src/app/dto/commande-fournisseur-dto';
import { ClientFournisseurService } from 'src/app/services/client-fournisseur/client-fournisseur.service';
import { CommandeClientFournisseurService } from 'src/app/services/commande-client-fournisseur/commande-client-fournisseur.service';

@Component({
  selector: 'app-detail-commande-client-fournisseur',
  templateUrl: './detail-commande-client-fournisseur.component.html',
  styleUrls: ['./detail-commande-client-fournisseur.component.scss']
})
export class DetailCommandeClientFournisseurComponent implements OnInit, OnChanges {

  @Input()
  origin = '';

  @Input()
  commande: any = {};

  @Output()
  suppressionEvent = new EventEmitter();

  errorMsg = 'Impossible de supprimer cette commande !! peut etre elle est déja livrée';
  
  clientFournisseur: any = {};
  path = 'nouvellecommande';

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private clientFournisseurService: ClientFournisseurService, private cmdClientFournisseurService: CommandeClientFournisseurService){
    
  }

  ngOnInit(): void{
    /*this.activatedRoute.data.subscribe(data => {
      this.origin = data['origin'];
    });*/
    this.extractClientFournisseur();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['commande']) {
      this.extractClientFournisseur();
    }
  }

  modifierClick(): void {
    this.activatedRoute.data.subscribe(data => {
      this.origin = data['origin'];
    });
    this.path = this.path + this.origin;
    this.router.navigate([this.path, this.commande.id, this.clientFournisseur.id]);
  }

  extractClientFournisseur(): void {
    if (this.origin === 'client') {
      this.clientFournisseur = this.commande.client;
      /*const cc = this.commande as CommandeClientDto;
      this.clientFournisseurService.findOneClient(cc.client.id).subscribe(
        res => {
          this.clientFournisseur = res;
        }
      );*/
    } else if (this.origin === 'fournisseur') {
      this.clientFournisseur = this.commande.fournisseur;
      /*this.clientFournisseurService.findOneFournisseur(this.commande.fournisseur).subscribe(
        res => {
          this.clientFournisseur = res;
        }
      )*/
    }
  }

  confSuppressionCmd(): void {
    if(this.origin === 'client'){
      if(this.commande.id){
        this.cmdClientFournisseurService.deleteCC(this.commande.id).subscribe({
          next: (result) => {
            this.suppressionEvent.emit('success');
          }, error: (error) => {
            this.suppressionEvent.emit(this.errorMsg);
          }
        });
      }
    }else{
      if(this.commande.id){
        this.cmdClientFournisseurService.deleteCF(this.commande.id).subscribe({
          next: (result) => {
            this.suppressionEvent.emit('success');
          }, error: (error) => {
            this.suppressionEvent.emit(this.errorMsg);
          }
        });
      }
    }
  }
}
