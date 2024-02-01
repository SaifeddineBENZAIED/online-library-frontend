import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-detail-commande',
  templateUrl: './detail-commande.component.html',
  styleUrls: ['./detail-commande.component.scss']
})
export class DetailCommandeComponent implements OnInit {

  @Input()
  ligneCommande: any = {};

  constructor() { }

  ngOnInit(): void {
    
  }
}
