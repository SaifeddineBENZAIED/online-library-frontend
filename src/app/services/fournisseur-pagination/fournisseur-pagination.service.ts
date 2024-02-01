import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { FournisseurDto } from 'src/app/dto/fournisseur-dto';

@Injectable({
  providedIn: 'root'
})
export class FournisseurPaginationService {

  private listFournisseurSubject = new BehaviorSubject<FournisseurDto[]>([]);
  listFournisseur$ = this.listFournisseurSubject.asObservable();

  private paginatedFournisseursSubject = new BehaviorSubject<FournisseurDto[]>([]);
  paginatedFournisseurs$ = this.paginatedFournisseursSubject.asObservable();

  private itemsPerPage: number = 5;

  constructor() {}

  setListFournisseur(list: FournisseurDto[]): void {
    this.listFournisseurSubject.next(list);
    this.paginatedFournisseursSubject.next(this.getPaginatedFournisseurs(1));
  }

  getPaginatedFournisseurs(pageNumber: number): FournisseurDto[] {
    const startIndex = (pageNumber - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.listFournisseurSubject.value.slice(startIndex, endIndex);
  }

  onPageChange(pageNumber: number): void {
    this.paginatedFournisseursSubject.next(this.getPaginatedFournisseurs(pageNumber));
  }
}
