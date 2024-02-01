import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ArticleDto } from 'src/app/dto/article-dto';
import { SourceMvmntStock } from 'src/app/dto/source-mvmnt-stock';
import { StockDto } from 'src/app/dto/stock-dto';
import { TypeMvmntStock } from 'src/app/dto/type-mvmnt-stock';
import { StockService } from 'src/app/services/stock/stock.service';

@Component({
  selector: 'app-detail-stock-article',
  templateUrl: './detail-stock-article.component.html',
  styleUrls: ['./detail-stock-article.component.scss']
})
export class DetailStockArticleComponent implements OnInit {

  @Input()
  stockReel: number | undefined = 0;

  @Input() 
  article: ArticleDto = {};

  @Output()
  suppressionEvent = new EventEmitter();

  errorMsg = 'Erreur de la correction de stock !';

  corr: string = '';
  quantite: number = 0;

  constructor(private stockService: StockService, private router: Router) {}

  ngOnInit() {
    console.log('article',this.article);
    this.quantite = 0;
    this.corr = '';
  }

  correctionStock(article: ArticleDto): void {
    if(this.corr !== undefined){
      const stock: StockDto = {
        article: article,
        dateMvmnt: new Date(),
        quantite: +this.quantite,
        sourceMvmntStck: SourceMvmntStock.CORRECTION
      }
      if(this.corr === 'corrPos'){
        stock.typeMvmntStck = TypeMvmntStock.CORRECTION_POS;
        this.stockService.correctionStockPos(stock).subscribe({
          next: (result) => {
            this.updateStockReel(article);
            this.suppressionEvent.emit('success');
          }, error: (error) => {
            this.suppressionEvent.emit(this.errorMsg);
          }        
        });
      }else if(this.corr === 'corrNeg'){
        stock.typeMvmntStck = TypeMvmntStock.CORRECTION_NEG;
        this.stockService.correctionStockNeg(stock).subscribe({
          next: (result) => {
            this.updateStockReel(article);
            this.suppressionEvent.emit('success');
          }, error: (error) => {
            this.suppressionEvent.emit(this.errorMsg);
          }        
        });
      }else{
        console.error('Type de correction est invalid !');
      }
      this.quantite = 0;
      this.corr = '';
    }
  }

  updateStockReel(article: ArticleDto): void{
    this.stockService.getStockReelArticle(article.id!).subscribe(
      res => {
        this.stockReel = res;
      }
    );
  }

}
