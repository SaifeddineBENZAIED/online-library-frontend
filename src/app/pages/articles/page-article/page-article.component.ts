import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ArticleDto } from 'src/app/dto/article-dto';
import { ArticlePaginationService } from 'src/app/services/article-pagination/article-pagination.service';
import { ArticleService } from 'src/app/services/article/article.service';

@Component({
  selector: 'app-page-article',
  templateUrl: './page-article.component.html',
  styleUrls: ['./page-article.component.scss']
})
export class PageArticleComponent implements OnInit {

  listArticle: Array<ArticleDto> = [];
  paginatedArticles: Array<ArticleDto> = [];
  artErrorMsg = '';
  itemsPerPage: number = 5;
  currentPage: number = 1;

  constructor(private router: Router, private articleService: ArticleService, public articlePaginationService: ArticlePaginationService) {}

  ngOnInit(): void {
    this.findAllArticles();
  }

  findAllArticles(): void {
    this.articleService.findAll().subscribe(
      list => {
        this.listArticle = list;
        this.articlePaginationService.setListArticle(list);
        this.paginatedArticles = this.articlePaginationService.getPaginatedArticles(this.currentPage);
      }
    );
  }

  handleSuppression(event: any): void {
    if (event === 'success') {
      this.findAllArticles();
    } else {
      this.artErrorMsg = event;
    }
  }

  nouvelArticle(): void {
    this.router.navigate(['nouvelarticle']);
  }

  onPageChange(pageNumber: number): void {
    this.currentPage = pageNumber;
    this.articlePaginationService.onPageChange(pageNumber);
    this.paginatedArticles = this.articlePaginationService.getPaginatedArticles(pageNumber);
  }
}
