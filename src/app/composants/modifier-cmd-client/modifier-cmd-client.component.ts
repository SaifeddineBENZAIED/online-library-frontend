import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, map } from 'rxjs';
import { ArticleDto } from 'src/app/dto/article-dto';
import { ClientDto } from 'src/app/dto/client-dto';
import { CommandeClientDto } from 'src/app/dto/commande-client-dto';
import { EtatCommande } from 'src/app/dto/etat-commande';
import { LigneCommandeClientDto } from 'src/app/dto/ligne-commande-client-dto';
import { SourceMvmntStock } from 'src/app/dto/source-mvmnt-stock';
import { StockDto } from 'src/app/dto/stock-dto';
import { TypeMvmntStock } from 'src/app/dto/type-mvmnt-stock';
import { ArticleService } from 'src/app/services/article/article.service';
import { ClientFournisseurService } from 'src/app/services/client-fournisseur/client-fournisseur.service';
import { CommandeClientFournisseurService } from 'src/app/services/commande-client-fournisseur/commande-client-fournisseur.service';
import { StockService } from 'src/app/services/stock/stock.service';

@Component({
  selector: 'app-modifier-cmd-client',
  templateUrl: './modifier-cmd-client.component.html',
  styleUrls: ['./modifier-cmd-client.component.scss']
})
export class ModifierCmdClientComponent implements OnInit {

  selectedClient: ClientDto = {};
  searchedArticle: ArticleDto = {};
  listArticle: Array<ArticleDto> = [];
  nomArticle = '';
  quantite = '';
  codeCommande = '';
  commande: CommandeClientDto = {};
  nomComplet = '';

  lignesCommande: Array<LigneCommandeClientDto> = [];
  totalCommande = 0;
  totalQuantite = 0;
  articleNotYetSelected = false;
  checkArtExistance = false;
  errorMsg = '';
  stockReelArt: number = 0;
  idCmd: number = -1;
  idClient: number = -1;

  defaultImg = 'assets/clientImg.png';

  date = new Date();

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private clientService: ClientFournisseurService, private commandeClientService: CommandeClientFournisseurService, private articleService: ArticleService, private stockService: StockService){
    
  }

  ngOnInit(): void{
    this.idCmd = this.activatedRoute.snapshot.params['idCommande'];
    this.idClient = this.activatedRoute.snapshot.params['idClient'];
    this.commandeClientService.findOneCC(this.idCmd).subscribe(
      res => {
        this.commande = res;
        this.codeCommande = res.codeCC!;
        this.findLignesCmd(this.commande.id!);
      }
    );
    this.findClient();
    this.findAllArticles();
    this.calculerTotalCommande();
  }

  findClient() {
    this.clientService.findOneClient(this.idClient).subscribe(
      res => {
        this.selectedClient = res;
        this.nomComplet = this.selectedClient.nom! + ' ' + this.selectedClient.prenom!;
      }
    )
  }

  findLignesCmd(id: number) {
    this.commandeClientService.findAllLignesCC(id).subscribe(
      res => {
        this.lignesCommande = res;
      }
    );
  }

  findAllArticles(): void {
    this.articleService.findAll()
    .subscribe(articles => {
      this.listArticle = articles;
    });
  }

  filtrerArticle(): void {
    if (this.nomArticle.length === 0) {
      this.findAllArticles();
    }
    const nomArticleRecherche = this.nomArticle.toLowerCase();

    this.listArticle = this.listArticle
      .filter(art => 
        (art.nomArticle?.toLowerCase().includes(nomArticleRecherche) || 
         art.description?.toLowerCase().includes(nomArticleRecherche))
      );
  }

  ajouterLigneCommande(): void {
    if(this.nomArticle !== ''  && !isNaN(Number(this.quantite))){
      this.articleService.findByNomArticle(this.nomArticle).subscribe({
        next: (res) => {
          this.stockService.getStockReelArticle(res.id!).subscribe({
            next: (stock) => {
              if((Number(stock) - Number(this.quantite)) >= 0 ){
                this.checkLigneCommande();
                this.calculerTotalCommande();

                this.searchedArticle = {};
                this.quantite = '';
                this.nomArticle = '';
                this.articleNotYetSelected = false;
                this.findAllArticles();
              }else{
                this.errorMsg = 'Stock insuffisant !!';
              }
            }, error: (error) => {
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

  private checkLigneCommande(): void {
    const ligneCmdAlreadyExists = this.lignesCommande.find(lig => lig.article?.nomArticle === this.searchedArticle.nomArticle);
    if (ligneCmdAlreadyExists) {
      this.lignesCommande.forEach(lig => {
        if (lig && lig.article?.nomArticle === this.searchedArticle.nomArticle) {
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
          article: this.searchedArticle,
          prixUnitaire: this.searchedArticle.prixUnitaireTTC,
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
    if(this.totalCommande > 0){
      /*this.lignesCommande.forEach((lcc) => {
        lcc.commandeClient!.id = this.commande.id;
      });
      this.commande.ligneCommandeClients = this.lignesCommande;*/
      const cmd: CommandeClientDto = this.preparerCommande();
      this.commandeClientService.updateCommandeClient(cmd).subscribe({
        next: (cmd) => {
          this.router.navigate(['commandeclientforclient']);
        },error: (error) => {
          console.error(error);
          this.errorMsg = 'Verifier les données du commande';
        }
      });
    }else{
      this.errorMsg = 'Vous ne pouvez pas passer une commande vide !';
    }
  }

  private preparerCommande(): CommandeClientDto{
    const commandeClient: CommandeClientDto = {
      id: this.commande.id,
      codeCC: this.codeCommande,
      dateCommande: new Date(),
      etatCommande: EtatCommande.EN_PREPARATION,
      client: this.selectedClient,
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

  checkArticleExistance(): Observable<boolean> {
    return this.articleService.findByNomArticle(this.nomArticle).pipe(
      map(res => !!res)
    );
  }

  suppLigneCmd(ligne: LigneCommandeClientDto): void {
    // Trouver l'index de la ligne à supprimer
    const index = this.lignesCommande.indexOf(ligne);
    if (index > -1) {
      // Supprimer la ligne de la liste
      this.lignesCommande.splice(index, 1);
  
      // Mettre à jour le stock
      this.updateStock(ligne.article!, ligne.quantite!, 'CORRECTION_POS', 'COMMANDE_CLIENT');
  
      // Recalculer le total de la commande
      this.calculerTotalCommande();
    }
  }
  
  // Méthode pour mettre à jour le stock
  updateStock(article: ArticleDto, quantite: number, type: string, source: string): void {
    const stock: StockDto = {
      dateMvmnt: new Date(),
      quantite: quantite,
      article: article
    }
    this.stockService.correctionStockPos(stock).subscribe({
      next: () => {
        console.log('Stock mis à jour avec succès');
        
      },
      error: (error) => {
        console.error('Erreur lors de la mise à jour du stock', error);
      }
    });
  }
}
