import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ArticleDto } from 'src/app/dto/article-dto';
import { TypeArticle } from 'src/app/dto/type-article';
import { ArticleService } from 'src/app/services/article/article.service';
import { ImageService } from 'src/app/services/image/image.service';

@Component({
  selector: 'app-nouvel-article',
  templateUrl: './nouvel-article.component.html',
  styleUrls: ['./nouvel-article.component.scss']
})
export class NouvelArticleComponent implements OnInit {

  articleDto: ArticleDto = {};
  errorMsg = '';
  categorieList: Array<TypeArticle> = [TypeArticle.ARTICLE_PAPETERIE, TypeArticle.JOURNAL, TypeArticle.LIVRE];
  categorie: TypeArticle | null = null;

  file: File | null = null;
  imageUrl: string | ArrayBuffer = 'assets/productImg.png';

  constructor(private datePipe: DatePipe ,private router: Router, private activatedRoute: ActivatedRoute, private articleService: ArticleService, private imageService: ImageService){

  }

  ngOnInit(): void{
    this.categorie = null;
    const idArticle = this.activatedRoute.snapshot.params['idArticle'];
    if(idArticle){
      this.articleService.findOne(idArticle).subscribe(
        article => {
          this.articleDto = article;
          this.categorie = article.type!;
          if(this.articleDto.image){
            this.imageUrl = this.articleDto.image;
          }
        }
      )
    }
  }

  selectFileImg(files: FileList | null): void {
    if(files){
      this.file = files.item(0);
      if(this.file){
        const fileReader = new FileReader();
        fileReader.readAsDataURL(this.file);
        fileReader.onload = (event) => {
          if(fileReader.result){
            this.imageUrl = fileReader.result;
          }
        };
      }
    }
  }

  enregistrerImage(idArticle?: number, titre?: string): void{
    if(idArticle && this.file && titre){
      const id = idArticle;
      const context = 'article'

      /*const formData = new FormData();
      formData.append('file', this.file);*/

      this.imageService.uploadImage(id,titre,context,this.file).subscribe(
        result => {
          this.router.navigate(['articles']);
        }
      );
    } else{
      this.router.navigate(['articles']);
    }
  }

  calculerPrixTTC(): void {
    if(this.articleDto.prixUnitaireHT && this.articleDto.tauxTVA){
      this.articleDto.prixUnitaireTTC = +this.articleDto.prixUnitaireHT + (+(this.articleDto.prixUnitaireHT * (this.articleDto.tauxTVA / 100)));
    }
  }

  cancelClick(): void {
    this.router.navigate(['articles']);
  }

  saveArticle(): void {
    this.articleDto.type = this.categorie!;
    this.articleService.create(this.articleDto).subscribe({
      next: (article) => {
        this.enregistrerImage(this.articleDto.id , this.articleDto.nomArticle);
      }, error: (error) => {
        this.errorMsg = 'Erreur lors de l enregistrement d article , Verifier tous les données';
      }
    });
  }
}
