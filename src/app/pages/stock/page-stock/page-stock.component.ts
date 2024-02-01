import { Component, OnInit } from '@angular/core';
import { ArticleDto } from 'src/app/dto/article-dto';
import { StockDto } from 'src/app/dto/stock-dto';
import { ArticlePaginationService } from 'src/app/services/article-pagination/article-pagination.service';
import { ArticleService } from 'src/app/services/article/article.service';
import { StockService } from 'src/app/services/stock/stock.service';

@Component({
  selector: 'app-page-stock',
  templateUrl: './page-stock.component.html',
  styleUrls: ['./page-stock.component.scss']
})
export class PageStockComponent implements OnInit{

  listStocks: Map<number, StockDto[]> = new Map();
  listStocksReels: Map<number, number> = new Map();
  listArticles: Array<ArticleDto> = [];
  stockErrMsg = '';

  paginatedArticles: Array<ArticleDto> = [];
  itemsPerPage: number = 5;
  currentPage: number = 1;

  constructor(private stockService: StockService, private articleService: ArticleService, private articlePaginationService: ArticlePaginationService) {}

  ngOnInit(): void {
    this.articleService.findAll().subscribe(
      res => {
        this.listArticles = res;
        this.articlePaginationService.setListArticle(this.listArticles);
        this.paginationOfArticles();
        this.findMvmntStock();
      }
    );
  }

  paginationOfArticles() {
    this.paginatedArticles = this.articlePaginationService.getPaginatedArticles(this.currentPage);
  }

  findMvmntStock() {
    for (const article of this.listArticles) {
      this.stockService.getMvmntStckArticle(article.id!).subscribe({
        next: (res) => {
          if(res){
            this.listStocks.set(article.id!, res);
            this.getStockReel(article.id!);
            console.log('mvmnt', this.listStocks.get(article.id!));
          }else{
            this.listStocks.set(article.id!, []);
            this.listStocksReels.set(article.id!, 0);
          }
        },
        error: (error) => {
          this.listStocks.set(article.id!, []);
          this.listStocksReels.set(article.id!, 0);
          console.error(`Error retrieving stock movements for article ${article.id}`);
        }
      });
    }
  }

  getStockReel(articleId: number) {
    this.stockService.getStockReelArticle(articleId).subscribe({
      next: (stockReel) => {
        this.listStocksReels.set(articleId, stockReel);
      },
      error: (error) => {
        console.error(`Error retrieving stock reel for article ${articleId}`);
      }
    });
  }

  handleSuppression(event: any): void {
    if (event === 'success') {
      this.findMvmntStock();
    } else {
      this.stockErrMsg = event;
    }
  }

  onPageChange(pageNumber: number): void {
    this.currentPage = pageNumber;
    this.articlePaginationService.onPageChange(pageNumber);
    this.paginatedArticles = this.articlePaginationService.getPaginatedArticles(pageNumber);
  }

}
