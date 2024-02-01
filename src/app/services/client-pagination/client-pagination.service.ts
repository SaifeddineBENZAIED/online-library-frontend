import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ClientDto } from 'src/app/dto/client-dto';

@Injectable({
  providedIn: 'root'
})
export class ClientPaginationService {

  private listClientSubject = new BehaviorSubject<ClientDto[]>([]);
  listClient$ = this.listClientSubject.asObservable();

  private paginatedClientsSubject = new BehaviorSubject<ClientDto[]>([]);
  paginatedClients$ = this.paginatedClientsSubject.asObservable();

  private itemsPerPage: number = 5;

  constructor() { }

  setListClient(list: ClientDto[]): void {
    this.listClientSubject.next(list);
    this.paginatedClientsSubject.next(this.getPaginatedClients(1));
  }

  getPaginatedClients(pageNumber: number): any[] {
    const startIndex = (pageNumber - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.listClientSubject.value.slice(startIndex, endIndex);
  }

  onPageChange(pageNumber: number): void {
    this.paginatedClientsSubject.next(this.getPaginatedClients(pageNumber));
  }

}
