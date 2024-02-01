import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClientDto } from 'src/app/dto/client-dto';
import { ClientFournisseurService } from 'src/app/services/client-fournisseur/client-fournisseur.service';
import { ClientPaginationService } from 'src/app/services/client-pagination/client-pagination.service';

@Component({
  selector: 'app-page-client',
  templateUrl: './page-client.component.html',
  styleUrls: ['./page-client.component.scss']
})
export class PageClientComponent implements OnInit {

  listClients: Array<ClientDto> = [];
  paginatedClients: Array<ClientDto> = [];
  itemsPerPage: number = 5;
  currentPage: number = 1;

  errorMsg = '';

  constructor(private router: Router , private clientService: ClientFournisseurService, public clientPaginationService: ClientPaginationService){
    
  }

  ngOnInit(): void{
    this.findAllClients();
  }

  findAllClients(): void{
    this.clientService.findAllClient().subscribe(
      list => {
        this.listClients = list;
        this.clientPaginationService.setListClient(list);
        this.paginatedClients = this.clientPaginationService.getPaginatedClients(this.currentPage);
      }
    )
  }

  handleSuppression(event: any): void {
    if(event === 'success'){
      this.findAllClients();
    }else{
      this.errorMsg = event;
    }
  }

  nouveauClient(): void {
    this.router.navigate(['nouveauclient']);
  }

  onPageChange(pageNumber: number): void {
    this.currentPage = pageNumber; // Update the current page
    this.clientPaginationService.onPageChange(pageNumber);
    this.paginatedClients = this.clientPaginationService.getPaginatedClients(pageNumber);
  }
}
