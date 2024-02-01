import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StockDto } from 'src/app/dto/stock-dto';

@Injectable({
  providedIn: 'root'
})
export class StockService {

  private apiUrl = 'http://localhost:3000/stock'; // Replace with your API URL

  constructor(private http: HttpClient) {}

  createStock(stockDto: StockDto): Observable<StockDto> {
    return this.http.post<StockDto>(`${this.apiUrl}/create`, stockDto);
  }

  correctionStockNeg(stockDto: StockDto): Observable<StockDto> {
    return this.http.patch<StockDto>(`${this.apiUrl}/correction-neg`, stockDto);
  }

  correctionStockPos(stockDto: StockDto): Observable<StockDto> {
    return this.http.patch<StockDto>(`${this.apiUrl}/correction-pos`, stockDto);
  }

  sortieStock(stockDto: StockDto): Observable<StockDto> {
    return this.http.patch<StockDto>(`${this.apiUrl}/sortie`, stockDto);
  }

  entreeStock(stockDto: StockDto): Observable<StockDto> {
    return this.http.patch<StockDto>(`${this.apiUrl}/entree`, stockDto);
  }

  getMvmntStckArticle(idArticle: number): Observable<StockDto[]> {
    return this.http.get<StockDto[]>(`${this.apiUrl}/article/${idArticle}`);
  }

  getStockReelArticle(idArticle: number): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/article/${idArticle}/stock-reel`);
  }
}
