import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ArticleDto } from 'src/app/dto/article-dto';

@Injectable({
  providedIn: 'root'
})
export class ArticlePaginationService {

  articlesSerie: Array<ArticleDto> = [];

  private listArticleSubject = new BehaviorSubject<ArticleDto[]>([]);
  listArticle$ = this.listArticleSubject.asObservable();

  private paginatedArticlesSubject = new BehaviorSubject<ArticleDto[]>([]);
  paginatedArticles$ = this.paginatedArticlesSubject.asObservable();

  private itemsPerPage: number = 5;

  constructor() {}

  setListArticle(list: ArticleDto[]): void {
    this.listArticleSubject.next(list);
    this.paginatedArticlesSubject.next(this.getPaginatedArticles(1));
  }

  getPaginatedArticles(pageNumber: number): ArticleDto[] {
    const startIndex = (pageNumber - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.articlesSerie = this.listArticleSubject.value.slice(startIndex, endIndex);
    return this.listArticleSubject.value.slice(startIndex, endIndex);
  }

  onPageChange(pageNumber: number): void {
    this.paginatedArticlesSubject.next(this.getPaginatedArticles(pageNumber));
  }

  setListArticleForAchat(list: ArticleDto[]): void {
    this.listArticleSubject.next(list);
    this.paginatedArticlesSubject.next(this.getPaginatedArticlesForAchat(1));
  }

  getPaginatedArticlesForAchat(pageNumber: number): ArticleDto[] {
    const startIndex = (pageNumber - 1) * (this.itemsPerPage + 1);
    const endIndex = startIndex + (this.itemsPerPage + 1);
    this.articlesSerie = this.listArticleSubject.value.slice(startIndex, endIndex);
    return this.listArticleSubject.value.slice(startIndex, endIndex);
  }

  onPageChangeForAchat(pageNumber: number): void {
    this.paginatedArticlesSubject.next(this.getPaginatedArticlesForAchat(pageNumber));
  }
}
