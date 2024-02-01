import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { StockDto } from 'src/app/dto/stock-dto';

@Injectable({
  providedIn: 'root'
})
export class StockPaginationService {

  stocksSerie: Array<StockDto> = [];

  private listStockSubject = new BehaviorSubject<StockDto[]>([]);
  listStock$ = this.listStockSubject.asObservable();

  private paginatedStocksSubject = new BehaviorSubject<StockDto[]>([]);
  paginatedStocks$ = this.paginatedStocksSubject.asObservable();

  private itemsPerPage: number = 5;

  constructor() {}

  setListstock(list: StockDto[]): void {
    this.listStockSubject.next(list);
    this.paginatedStocksSubject.next(this.getPaginatedstocks(1));
  }

  getPaginatedstocks(pageNumber: number): StockDto[] {
    const startIndex = (pageNumber - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.stocksSerie = this.listStockSubject.value.slice(startIndex, endIndex);
    return this.listStockSubject.value.slice(startIndex, endIndex);
  }

  onPageChange(pageNumber: number): void {
    this.paginatedStocksSubject.next(this.getPaginatedstocks(pageNumber));
  }
}
