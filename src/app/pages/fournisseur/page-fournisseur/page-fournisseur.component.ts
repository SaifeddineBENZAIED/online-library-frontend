import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FournisseurDto } from 'src/app/dto/fournisseur-dto';
import { ClientFournisseurService } from 'src/app/services/client-fournisseur/client-fournisseur.service';
import { FournisseurPaginationService } from 'src/app/services/fournisseur-pagination/fournisseur-pagination.service';

@Component({
  selector: 'app-page-fournisseur',
  templateUrl: './page-fournisseur.component.html',
  styleUrls: ['./page-fournisseur.component.scss']
})
export class PageFournisseurComponent implements OnInit{

  listFournisseurs: Array<FournisseurDto> = [];
  paginatedFournisseurs: Array<FournisseurDto> = [];
  itemsPerPage: number = 5;
  currentPage: number = 1;

  errorMsg = '';

  constructor(private router: Router, private fournissuerService: ClientFournisseurService, public fournisseurPaginationService: FournisseurPaginationService){
    
  }

  ngOnInit(): void{
    this.findAllFournisseurs();
  }

  findAllFournisseurs(): void{
    this.fournissuerService.findAllFournisseur().subscribe(
      list => {
        this.listFournisseurs = list;
        this.fournisseurPaginationService.setListFournisseur(list);
        this.paginatedFournisseurs = this.fournisseurPaginationService.getPaginatedFournisseurs(this.currentPage);
      }
    )
  }

  handleSuppression(event: any): void {
    if(event === 'success'){
      this.findAllFournisseurs();
    }else{
      this.errorMsg = event;
    }
  }

  nouveauFournisseur(): void {
    this.router.navigate(['nouveaufournisseur']);
  }

  onPageChange(pageNumber: number): void {
    this.currentPage = pageNumber; // Update the current page
    this.fournisseurPaginationService.onPageChange(pageNumber);
    this.paginatedFournisseurs = this.fournisseurPaginationService.getPaginatedFournisseurs(pageNumber);
  }
}
