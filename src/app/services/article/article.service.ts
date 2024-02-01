import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ArticleDto } from 'src/app/dto/article-dto';
import { LigneCommandeClientDto } from 'src/app/dto/ligne-commande-client-dto';
import { LigneCommandeFournisseurDto } from 'src/app/dto/ligne-commande-fournisseur-dto';
import { TypeArticle } from 'src/app/dto/type-article';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  private apiUrl = 'http://localhost:3000/article';

  constructor(private http: HttpClient) {}

  create(article: ArticleDto): Observable<ArticleDto> {
    return this.http.post<ArticleDto>(`${this.apiUrl}/create`, article);
  }

  findOne(id: string): Observable<ArticleDto> {
    return this.http.get<ArticleDto>(`${this.apiUrl}/find/${id}`);
  }

  findAll(): Observable<ArticleDto[]> {
    return this.http.get<ArticleDto[]>(`${this.apiUrl}/find/all`);
  }

  findByNomArticle(nomArticle: string): Observable<ArticleDto> {
    return this.http.get<ArticleDto>(`${this.apiUrl}/find/byName/${nomArticle}`);
  }

  findAllByNomArticle(nomArticle: string): Observable<ArticleDto[]> {
    return this.http.get<ArticleDto[]>(`${this.apiUrl}/find/allByName/${nomArticle}`);
  }

  findByCodeArticle(codeArticle: string): Observable<ArticleDto> {
    return this.http.get<ArticleDto>(`${this.apiUrl}/find/byCode/${codeArticle}`);
  }

  findByTypeArticle(typeArticle: TypeArticle): Observable<ArticleDto[]> {
    return this.http.get<ArticleDto[]>(`${this.apiUrl}/find/byType/${typeArticle}`);
  }

  findAllByNomArticleAndType(nomArticle: string, typeArticle: TypeArticle): Observable<ArticleDto[]> {
    return this.http.get<ArticleDto[]>(`${this.apiUrl}/find/allByNameAndType/${nomArticle}/${typeArticle}`);
  }

  findHistoriqueCommandeClient(id: string): Observable<LigneCommandeClientDto[]> {
    return this.http.get<LigneCommandeClientDto[]>(`${this.apiUrl}/historiqueCommandeClient/${id}`);
  }

  findHistoriqueCommandeFournisseur(id: string): Observable<LigneCommandeFournisseurDto[]> {
    return this.http.get<LigneCommandeFournisseurDto[]>(`${this.apiUrl}/historiqueCommandeFournisseur/${id}`);
  }

  delete(id: number): Observable<boolean> {
    return this.http.delete<boolean>(`${this.apiUrl}/delete/${id}`);
  }

  getMostSoldArticles(startDate?: Date, endDate?: Date): Observable<ArticleDto[]> {
    let params = new HttpParams();
    if (startDate) {
      params = params.set('startDate', startDate.toISOString());
    }
    if (endDate) {
      params = params.set('endDate', endDate.toISOString());
    }
    return this.http.get<ArticleDto[]>(`${this.apiUrl}/plus-vendus`, { params });
  }

  getMostPurchasedArticles(startDate?: Date, endDate?: Date): Observable<ArticleDto[]> {
    let params = new HttpParams();
    if (startDate) {
      params = params.set('startDate', startDate.toISOString());
    }
    if (endDate) {
      params = params.set('endDate', endDate.toISOString());
    }
    return this.http.get<ArticleDto[]>(`${this.apiUrl}/plus-achetes`, { params });
  }
}
