import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { FournisseurDto } from 'src/app/dto/fournisseur-dto';
import { ClientFournisseurService } from 'src/app/services/client-fournisseur/client-fournisseur.service';

@Component({
  selector: 'app-detail-fournisseur',
  templateUrl: './detail-fournisseur.component.html',
  styleUrls: ['./detail-fournisseur.component.scss']
})
export class DetailFournisseurComponent implements OnInit {

  @Input()
  fournisseur: FournisseurDto = {};

  adr2 = '';

  @Output()
  suppressionEvent = new EventEmitter();

  errorMsg = 'Impossible de supprimer ce fournisseur !! peut etre il a déja des commandes';
  
  constructor(private router: Router, private fournisseurService: ClientFournisseurService){

  }
  
  ngOnInit(): void {
  }

  modifierFournisseur(): void {
    this.router.navigate(['nouveaufournisseur', this.fournisseur.id]);
  }

  confSuppressionFournisseur(): void {
    if(this.fournisseur.id){
      this.fournisseurService.removeFournisseur(this.fournisseur.id).subscribe({
        next: (result) => {
          this.suppressionEvent.emit('success')
        }, error: (error) => {
          this.suppressionEvent.emit(this.errorMsg);
        }
      });
    }
  }
}
