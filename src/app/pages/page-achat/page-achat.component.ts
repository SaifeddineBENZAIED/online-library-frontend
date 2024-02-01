import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ArticleDto } from 'src/app/dto/article-dto';
import { ClientDto } from 'src/app/dto/client-dto';
import { CommandeClientDto } from 'src/app/dto/commande-client-dto';
import { EtatCommande } from 'src/app/dto/etat-commande';
import { LigneCommandeClientDto } from 'src/app/dto/ligne-commande-client-dto';
import { TypeArticle } from 'src/app/dto/type-article';
import { ArticlePaginationService } from 'src/app/services/article-pagination/article-pagination.service';
import { ArticleService } from 'src/app/services/article/article.service';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { ClientFournisseurService } from 'src/app/services/client-fournisseur/client-fournisseur.service';
import { CommandeClientFournisseurService } from 'src/app/services/commande-client-fournisseur/commande-client-fournisseur.service';
import { StockService } from 'src/app/services/stock/stock.service';

@Component({
  selector: 'app-page-achat',
  templateUrl: './page-achat.component.html',
  styleUrls: ['./page-achat.component.scss']
})
export class PageAchatComponent implements OnInit {

  listArticle: Array<ArticleDto> = [];
  clientDto: ClientDto = {};
  quantite = '';
  commandeClient: CommandeClientDto = {};
  lignesCommande: Array<any> = [];
  totalCommande = 0;
  totalQuantite = 0;
  codeCommande ='';
  searchedArticle: ArticleDto = {};
  articleNotYetSelected = false;
  nomArticle ='';
  errorMsg ='';
  date = new Date();
  categorieList: Array<TypeArticle> = [TypeArticle.ARTICLE_PAPETERIE, TypeArticle.JOURNAL, TypeArticle.LIVRE];
  categorie: TypeArticle | null = null;
  nom: string | null = null;
  articlesAffiches: Array<ArticleDto> = [];
  itemsPerPage: number = 6;
  currentPage: number = 1;

  constructor(
    private activatedRoute: ActivatedRoute,
    private articleService: ArticleService,
    private articlePaginationService: ArticlePaginationService,
    private commandeClientService: CommandeClientFournisseurService,
    private clientService: ClientFournisseurService,
    private authService: AuthenticationService,
    private stockService: StockService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.params['id'];
    this.categorie = null;
    this.nom = null;
    this.clientService.findOneClient(id).subscribe(
      res => {
        this.clientDto = res;
      }
    );
    this.generateCommandCode();
    this.findAllArticles();
  }

  generateCommandCode() {
    if(this.clientDto){
      this.commandeClientService.generateCodeCC(this.clientDto.nom!, this.clientDto.prenom!).subscribe(
        res => {
          this.codeCommande = res;
        }
      );
    }else{
      this.codeCommande = '';
    }
  }

  findAllArticles(): void {
    this.articleService.findAll()
    .subscribe(articles => {
      this.listArticle = articles;
      //this.mettreAJourLesArticlesAffiches();
      this.mettreAJourLesArticlesAffiches();
    });
  }

  mettreAJourLesArticlesAffiches(): void {
    this.articlePaginationService.setListArticle(this.listArticle);
    this.articlesAffiches = this.articlePaginationService.getPaginatedArticles(this.currentPage);
  }

  ajouterLigneCommande(nomArticle: string): void {
    if(nomArticle !== ''  && !isNaN(Number(this.quantite))){
      this.articleService.findByNomArticle(nomArticle).subscribe({
        next: (res) => {
          this.stockService.getStockReelArticle(res.id!).subscribe({
            next: (stock) => {
              if((Number(stock) - Number(this.quantite)) >= 0 ){
                this.checkLigneCommande(res);
                this.calculerTotalCommande();

                this.searchedArticle = {};
                this.quantite = '';
                this.nomArticle = '';
                this.articleNotYetSelected = false;
                this.findAllArticles();
              }else{
                this.errorMsg = 'Stock insuffisant !!';
              }
            }, error: () => {
              this.errorMsg = 'Error in Stock calcul or stock insuffisant !!';
            }
          })
        }, error: (err) => {
          console.error(err);
        }
      });
    }
  }

  calculerTotalCommande(): void {
    this.totalCommande = 0;
    this.lignesCommande.forEach(ligne => {
      if (ligne.prixUnitaire && ligne.quantite) {
        this.totalCommande += +ligne.prixUnitaire * +ligne.quantite;
      }
    });
  }

  private checkLigneCommande(article: ArticleDto): void {
    const ligneCmdAlreadyExists = this.lignesCommande.find(lig => lig.article?.nomArticle === article.nomArticle);
    if (ligneCmdAlreadyExists) {
      this.lignesCommande.forEach(lig => {
        if (lig && lig.article?.nomArticle === article.nomArticle) {
          if (Number(lig.quantite)+Number(this.quantite) > 0){
            // @ts-ignore
            lig.quantite = lig.quantite + +this.quantite;
          }else{
            this.errorMsg = 'Verifiez la quantite SVP';
          }
        }
      });
    } else {
      if(Number(this.quantite) > 0){
        const ligneCmd: LigneCommandeClientDto = {
          commandeClient: this.commandeClient,
          article: article,
          prixUnitaire: article.prixUnitaireTTC,
          quantite: +this.quantite
        };
        this.lignesCommande.push(ligneCmd);
      }else{
        this.errorMsg = 'Verifiez la quantite SVP';
      }
    }
  }

  selectArticleClick(article: ArticleDto): void {
    this.searchedArticle = article;
    this.nomArticle = article.nomArticle ? article.nomArticle : '';
    this.articleNotYetSelected = true;
  }

  saveClick(): void {
      const commande = this.preparerCommande();
      this.lignesCommande.forEach((lcc) => {
        lcc.commandeClient = commande;
      });
      console.log('cmd', commande);
      //commande.ligneCommandeClients = this.lignesCommande;
      if(commande.ligneCommandeClients!.length > 0){
        this.commandeClientService.createCC(commande).subscribe({
          next: (cmd) => {
            this.router.navigate(['commandeclientforclient']);
          },error: (error) => {
            this.errorMsg = 'Verifier les données du commande';
          }
        });
      }else{
        this.errorMsg = 'Impossible de soumettre une commande vide !!'
      }
  }

  preparerCommande(): CommandeClientDto {
    const commandeClient: CommandeClientDto = {
      codeCC: this.codeCommande,
      dateCommande: new Date(),
      etatCommande: EtatCommande.EN_PREPARATION,
      client: this.clientDto,
      ligneCommandeClients: this.lignesCommande.map(ligne => ({
        article: ligne.article,
        quantite: ligne.quantite,
        prixUnitaire: ligne.prixUnitaire
      }))
    };
    return commandeClient;
  }

  cancelClick(): void {
    this.router.navigate(['commandeclientforclient']);
  }

  /*formateDate(){
    const day = String(this.date.getDate()).padStart(2, '0');
    const month = String(this.date.getMonth() + 1).padStart(2, '0');
    const year = this.date.getFullYear();


    const hours = String(this.date.getHours()).padStart(2, '0');
    const minutes = String(this.date.getMinutes()).padStart(2, '0');
    const seconds = String(this.date.getSeconds()).padStart(2, '0');
    const milliseconds = String(this.date.getMilliseconds()).padStart(3, '0');


    const formattedDate = `${day}-${month}-${year} ${hours}:${minutes}:${seconds}.${milliseconds}`;

    return formattedDate;

  }*/

  filtreParCategorie() {
    if(this.categorie){
      if(this.nom){
        this.filtrerParNomEtType();
      }else{
        this.articleService.findByTypeArticle(this.categorie).subscribe(
          res => {
            this.listArticle = res;
            this.mettreAJourLesArticlesAffiches();
          }
        )
      }
    }else{
      if(this.nom){
        this.filtreParNomArticle();
      }else{
        this.findAllArticles();
      }
    }
  }

  filtreParNomArticle() {
    if(this.nom){
      if(this.categorie){
        this.filtrerParNomEtType();
      }else{
        this.articleService.findAllByNomArticle(this.nom).subscribe({
          next: (res) => {
            this.errorMsg = '';
            this.listArticle = res;
            this.mettreAJourLesArticlesAffiches();
          }, error: (error) => {
            this.errorMsg = 'Probleme de recherche des articles !!'
            this.listArticle = [];
            this.mettreAJourLesArticlesAffiches();
          }
        })
      }
    }else{
      if(this.categorie){
        this.filtreParCategorie();
      }else{
        this.findAllArticles();
      }
    }
  }

  filtrerParNomEtType() {
    this.articleService.findAllByNomArticleAndType(this.nom!, this.categorie!).subscribe({
      next: (res) => {
        this.errorMsg = '';
        this.listArticle = res;
        this.mettreAJourLesArticlesAffiches();
      }, error:(error) => {
        this.errorMsg = 'Probleme de recherche des articles !!'
        this.listArticle = [];
        this.mettreAJourLesArticlesAffiches();
      }
    })
  }

  onPageChange(pageNumber: number): void {
    this.currentPage = pageNumber;
    this.articlePaginationService.onPageChange(pageNumber);
    this.articlesAffiches = this.articlePaginationService.getPaginatedArticles(pageNumber);
  }

  suppLigneCmd(ligne: LigneCommandeClientDto): void {
    const index = this.lignesCommande.indexOf(ligne);
    if (index > -1) {
      this.lignesCommande.splice(index, 1);
      this.calculerTotalCommande();
    }
  }
  
}
