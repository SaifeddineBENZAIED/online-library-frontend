import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CmdClientFournisseurPaginationService {

  cmdsSerie: Array<any> = [];

  private listCmdSubject = new BehaviorSubject<any[]>([]);
  listCmd$ = this.listCmdSubject.asObservable();

  private paginatedCmdsSubject = new BehaviorSubject<any[]>([]);
  paginatedCmds$ = this.paginatedCmdsSubject.asObservable();

  private itemsPerPage: number = 5;

  constructor() {}

  setListcmd(list: any[]): void {
    this.listCmdSubject.next(list);
    this.paginatedCmdsSubject.next(this.getPaginatedcmds(1));
  }

  getPaginatedcmds(pageNumber: number): any[] {
    const startIndex = (pageNumber - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.cmdsSerie = this.listCmdSubject.value.slice(startIndex, endIndex);
    return this.listCmdSubject.value.slice(startIndex, endIndex);
  }

  onPageChange(pageNumber: number): void {
    this.paginatedCmdsSubject.next(this.getPaginatedcmds(pageNumber));
  }
}
