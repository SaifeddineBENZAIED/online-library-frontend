import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, map } from 'rxjs';
import { ArticleDto } from 'src/app/dto/article-dto';
import { ClientDto } from 'src/app/dto/client-dto';
import { CommandeClientDto } from 'src/app/dto/commande-client-dto';
import { CommandeFournisseurDto } from 'src/app/dto/commande-fournisseur-dto';
import { EtatCommande } from 'src/app/dto/etat-commande';
import { FournisseurDto } from 'src/app/dto/fournisseur-dto';
import { LigneCommandeClientDto } from 'src/app/dto/ligne-commande-client-dto';
import { LigneCommandeFournisseurDto } from 'src/app/dto/ligne-commande-fournisseur-dto';
import { StockDto } from 'src/app/dto/stock-dto';
import { ArticleService } from 'src/app/services/article/article.service';
import { ClientFournisseurService } from 'src/app/services/client-fournisseur/client-fournisseur.service';
import { CommandeClientFournisseurService } from 'src/app/services/commande-client-fournisseur/commande-client-fournisseur.service';
import { StockService } from 'src/app/services/stock/stock.service';

@Component({
  selector: 'app-nouvelle-commande-client-fournisseur',
  templateUrl: './nouvelle-commande-client-fournisseur.component.html',
  styleUrls: ['./nouvelle-commande-client-fournisseur.component.scss']
})
export class NouvelleCommandeClientFournisseurComponent implements OnInit {

  origin = '' ;
  newOrEdit= 'Nouvelle';

  selectedClientFournisseur: any = {};
  listClientsFournisseurs: Array<any> = [];
  searchedArticle: ArticleDto = {};
  listArticle: Array<ArticleDto> = [];
  nomArticle = '';
  quantite = '';
  codeCommande = '';
  commande: any = {};
  idCltFrs = -1;

  lignesCommande: Array<any> = [];
  totalCommande = 0;
  totalQuantite = 0;
  articleNotYetSelected = false;
  checkArtExistance = false;
  errorMsg = '';
  stockReelArt: number = 0;
  listEtatCmd: Array<EtatCommande> = [EtatCommande.EN_PREPARATION, EtatCommande.VALIDEE, EtatCommande.LIVREE];
  etatCmd: EtatCommande = EtatCommande.EN_PREPARATION;

  defaultImg = '';

  date = new Date();

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private datePipe: DatePipe, private clientFournisseurService: ClientFournisseurService, private commandeClientFournisseurService: CommandeClientFournisseurService, private articleService: ArticleService, private stockService: StockService){
    
  }

  ngOnInit(): void{
    this.idCltFrs = -1;
    this.newOrEdit = 'Nouvelle'
    const idCmd = this.activatedRoute.snapshot.params['idCommande'];
    this.idCltFrs = this.activatedRoute.snapshot.params['id'];
    this.activatedRoute.data.subscribe(data => {
      this.origin = data['origin'];
    });
    this.defaultImg = 'assets/' + this.origin + 'Img.png';
    if(idCmd){
      this.newOrEdit = 'Modification de'
      if(this.origin === 'client'){
        this.commandeClientFournisseurService.findOneCC(idCmd).subscribe(
          res => {
            this.commande = res;
            this.codeCommande = res.codeCC!;
            this.etatCmd = res.etatCommande!;
            this.findCltFrs();
            this.findLignesCmd(this.commande.id);
            this.calculerTotalCommande()
          }
        );
      }else{
        this.commandeClientFournisseurService.findByIdCF(idCmd).subscribe(
          res => {
            this.commande = res;
            this.codeCommande = res.codeCF!;
            this.etatCmd = res.etatCommande!;
            this.findCltFrs();
            this.findLignesCmd(this.commande.id);
            this.calculerTotalCommande()
          }
        );
      }
    }else{
      this.generateCommandCode();
    }
    this.findAllClientsFournisseurs();
    this.findAllArticles();
  }

  findCltFrs() {
    if(this.origin === 'client'){
      this.clientFournisseurService.findOneClient(this.idCltFrs).subscribe(
        res => {
          this.selectedClientFournisseur = res as ClientDto;
        }
      );
    }else{
      this.clientFournisseurService.findOneFournisseur(this.idCltFrs).subscribe(
        res => {
          this.selectedClientFournisseur = res as FournisseurDto;
        }
      );
    }
  }

  findLignesCmd(id: number) {
    if(this.origin === 'client'){
      this.commandeClientFournisseurService.findAllLignesCC(id).subscribe(
        res => {
          this.lignesCommande = res;
        }
      );
    }else{
      this.commandeClientFournisseurService.findAllLignesCF(id).subscribe(
        res => {
          this.lignesCommande = res;
        }
      );
    }
  }

  generateCommandCode() {
    if(JSON.stringify(this.selectedClientFournisseur) !== '{}' && this.selectedClientFournisseur !== undefined){
      if(this.origin === 'client'){
        this.commandeClientFournisseurService.generateCodeCC(this.selectedClientFournisseur.nom, this.selectedClientFournisseur.prenom).subscribe(
          res => {

            this.codeCommande = res;
          }
        )
      }else{
        this.commandeClientFournisseurService.generateCodeCF(this.selectedClientFournisseur.nom, this.selectedClientFournisseur.prenom).subscribe(
          res => {
            this.codeCommande = res;
          }
        )
      }
    }else{
      this.codeCommande = '';
    }
  }

  /*async generateCommandCode() {
    const typePrefix = this.origin === 'client' ? 'C' : 'F';
    let newCode = '';
    let codeGenerated = false;
  
    while (!codeGenerated) {
      newCode = `${typePrefix}-${this.generateRandomCode()}`;
      codeGenerated = await this.checkCodeUniqueness(newCode);
    }
  
    this.codeCommande = newCode;
  }
  
  generateRandomCode() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < 4; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters.charAt(randomIndex);
    }
    return result;
  }
  
  checkCodeUniqueness(code: string): Promise<boolean> {
    if(this.origin === 'client'){
      return new Promise((resolve) => {
        this.commandeClientFournisseurService.findOneCCByCode(code).subscribe(res => {
          resolve(!res);
        });
      });
    }else{
      return new Promise((resolve) => {
        this.commandeClientFournisseurService.findOneCFByCode(code).subscribe(res => {
          resolve(!res);
        });
      });
    }
  }*/

  findAllClientsFournisseurs(): void {
    if (this.origin === 'client') {
      this.clientFournisseurService.findAllClient()
      .subscribe(clients => {
        this.listClientsFournisseurs = clients;
      });
    } else if (this.origin === 'fournisseur' ) {
      this.clientFournisseurService.findAllFournisseur()
      .subscribe(fournisseurs => {
        this.listClientsFournisseurs = fournisseurs;
      });
    }
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
      if(this.origin === 'client'){
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
      }else{
        this.checkLigneCommande();
        this.calculerTotalCommande();
  
        this.searchedArticle = {};
        this.quantite = '';
        this.nomArticle = '';
        this.articleNotYetSelected = false;
        this.findAllArticles();
      }
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
        if(this.origin === 'client'){
          const ligneCmd: LigneCommandeClientDto = {
            article: this.searchedArticle,
            prixUnitaire: this.searchedArticle.prixUnitaireTTC,
            quantite: +this.quantite
          };
          this.lignesCommande.push(ligneCmd);
        } else if(this.origin === 'fournisseur'){
          const ligneCmd: LigneCommandeFournisseurDto = {
            article: this.searchedArticle,
            prixUnitaire: this.searchedArticle.prixUnitaireTTC,
            quantite: +this.quantite
          };
          this.lignesCommande.push(ligneCmd);
        }
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
      const idCmd = this.activatedRoute.snapshot.params['idCommande'];
      if(idCmd){
        if (this.origin === 'client') {
          const cmd: CommandeClientDto = this.preparerExistingCommande();
          this.lignesCommande.forEach((lcc) => {
            lcc.commandeClient = this.commande;
          });
          //this.commande.ligneCommandeClients = this.lignesCommande;
          console.log('cmd', cmd);
          this.commandeClientFournisseurService.updateCommandeClient(cmd).subscribe({
            next: (cmd) => {
              this.router.navigate(['commandeclient']);
            },error: (error) => {
              console.error(error);
              this.errorMsg = 'Verifier les données du commande';
            }
          });
        } else if (this.origin === 'fournisseur') {
          const cmd: CommandeFournisseurDto = this.preparerExistingCommande();
          this.lignesCommande.forEach((lcf) => {
            lcf.commandefournisseur = this.commande;
          });
          //this.commande.ligneCommandeFournisseurs = this.lignesCommande;
          this.commandeClientFournisseurService.updateCommandeFournisseur(cmd).subscribe({
            next: (cmd) => {
              this.router.navigate(['commandefournisseur']);
            }, error: (error) => {
              this.errorMsg = 'Verifier les données du commande';
            }
          });
        }
      }else{
        const commande = this.preparerCommande();
        if (this.origin === 'client') {
          this.lignesCommande.forEach((lcc) => {
            lcc.commandeClient = commande;
          });
          //commande.ligneCommandeClients = this.lignesCommande;
          this.commandeClientFournisseurService.createCC(commande as CommandeClientDto).subscribe({
            next: (cmd) => {
              this.router.navigate(['commandeclient']);
            },error: (error) => {
              this.errorMsg = 'Verifier les données du commande';
            }
          });
        } else if (this.origin === 'fournisseur') {
          this.lignesCommande.forEach((lcf) => {
            lcf.commandefournisseur = commande;
          });
          //commande.ligneCommandeFournisseurs = this.lignesCommande;
          this.commandeClientFournisseurService.createCF(commande  as CommandeFournisseurDto).subscribe({
            next: (cmd) => {
              this.router.navigate(['commandefournisseur']);
            }, error: (error) => {
              this.errorMsg = 'Verifier les données du commande';
            }
          });
        }
      }
    }else{
      this.errorMsg = 'Vous ne pouvez pas passer une commande vide !';
    }
  }

  /*private preparerCommande(): any {
    if (this.origin === 'client') {
      const commandeCl: CommandeClientDto = {};
      commandeCl.client = this.selectedClientFournisseur as ClientDto;
      commandeCl.codeCC = this.codeCommande;
      commandeCl.dateCommande = new Date();
      commandeCl.etatCommande = EtatCommande.EN_PREPARATION;
      return commandeCl;
    } else if (this.origin === 'fournisseur') {
      const commandeFr: CommandeFournisseurDto = {};
      commandeFr.fournisseur = this.selectedClientFournisseur as FournisseurDto;
      commandeFr.codeCF = this.codeCommande;
      commandeFr.dateCommande = new Date();
      commandeFr.etatCommande = EtatCommande.EN_PREPARATION;
      return commandeFr;
    }
  }*/

  private preparerCommande(): CommandeClientDto | CommandeFournisseurDto{
    if(this.origin === 'client'){
      const commandeClient: CommandeClientDto = {
        codeCC: this.codeCommande,
        dateCommande: new Date(),
        etatCommande: EtatCommande.EN_PREPARATION,
        client: this.selectedClientFournisseur,
        ligneCommandeClients: this.lignesCommande.map(ligne => ({
          article: ligne.article,
          quantite: ligne.quantite,
          prixUnitaire: ligne.prixUnitaire
        }))
      };
      return commandeClient;
    }else{
      const commandeFournisseur: CommandeFournisseurDto = {
        codeCF: this.codeCommande,
        dateCommande: new Date(),
        etatCommande: EtatCommande.EN_PREPARATION,
        fournisseur: this.selectedClientFournisseur,
        ligneCommandeFournisseurs: this.lignesCommande.map(ligne => ({
          article: ligne.article,
          quantite: ligne.quantite,
          prixUnitaire: ligne.prixUnitaire
        }))
      };
      return commandeFournisseur;
    }
  }

  preparerExistingCommande() : CommandeClientDto | CommandeFournisseurDto{
    if(this.origin === 'client'){
      const commandeClient: CommandeClientDto = {
        id: this.commande.id,
        codeCC: this.codeCommande,
        dateCommande: new Date(),
        etatCommande: this.etatCmd,
        client: this.selectedClientFournisseur,
        ligneCommandeClients: this.lignesCommande.map(ligne => ({
          article: ligne.article,
          quantite: ligne.quantite,
          prixUnitaire: ligne.prixUnitaire
        }))
      };
      return commandeClient;
    }else{
      const commandeFournisseur: CommandeFournisseurDto = {
        id: this.commande.id,
        codeCF: this.codeCommande,
        dateCommande: new Date(),
        etatCommande: this.etatCmd,
        fournisseur: this.selectedClientFournisseur,
        ligneCommandeFournisseurs: this.lignesCommande.map(ligne => ({
          article: ligne.article,
          quantite: ligne.quantite,
          prixUnitaire: ligne.prixUnitaire
        }))
      };
      return commandeFournisseur;
    }
  }

  cancelClick(): void {
    if(this.origin === 'client'){
      this.router.navigate(['commandeclient']);
    }else if(this.origin === 'fournisseur'){
      this.router.navigate(['commandefournisseur']);
    }
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
