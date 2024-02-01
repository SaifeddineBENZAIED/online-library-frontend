import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ArticleDto } from 'src/app/dto/article-dto';
import { ArticleService } from 'src/app/services/article/article.service';

@Component({
  selector: 'app-detail-article',
  templateUrl: './detail-article.component.html',
  styleUrls: ['./detail-article.component.scss']
})
export class DetailArticleComponent implements OnInit {

  @Input()
  articleDto: ArticleDto = {};

  @Output()
  suppressionEvent = new EventEmitter();

  errorMsg = 'Impossible de supprimer cet article !! peut etre il est déja utilisé dans une commande';

  constructor(
    private router: Router,
    private articleService: ArticleService
  ){

  }

  ngOnInit(): void{
  }

  confSuppressionArticle(): void {
    if(this.articleDto.id){
      this.articleService.delete(this.articleDto.id).subscribe({
        next: (result) => {
          this.suppressionEvent.emit('success');
        }, error: (error) => {
          this.suppressionEvent.emit(this.errorMsg);
        }
      });
    }
  }

  editArticle() {
    this.router.navigate(['nouvelarticle', this.articleDto.id]);
  }
}
