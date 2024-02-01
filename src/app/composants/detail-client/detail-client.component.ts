import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ClientDto } from 'src/app/dto/client-dto';
import { ClientFournisseurService } from 'src/app/services/client-fournisseur/client-fournisseur.service';

@Component({
  selector: 'app-detail-client',
  templateUrl: './detail-client.component.html',
  styleUrls: ['./detail-client.component.scss']
})
export class DetailClientComponent implements OnInit {

  @Input()
  client: ClientDto = {};

  adr2 = '';

  @Output()
  suppressionEvent = new EventEmitter();

  errorMsg = 'Impossible de supprimer ce client !! peut etre il a déja passer des commandes';
  
  constructor(private router: Router, private clientService: ClientFournisseurService){

  }
  
  ngOnInit(): void {
  }

  modifierClient(): void {
    this.router.navigate(['nouveauclient', this.client.id]);
  }

  confSuppressionClient(): void {
    if(this.client.id){
      this.clientService.removeClient(this.client.id).subscribe({
        next: (result) => {
          this.suppressionEvent.emit('success')
        }, error: (error) => {
          this.suppressionEvent.emit(this.errorMsg);
        }
      });
    }
  }
}
