import { Component, OnInit } from '@angular/core';
import { ArticleDto } from 'src/app/dto/article-dto';
import { ClientDto } from 'src/app/dto/client-dto';
import { ArticleService } from 'src/app/services/article/article.service';
import { ClientFournisseurService } from 'src/app/services/client-fournisseur/client-fournisseur.service';

@Component({
  selector: 'app-page-statistique',
  templateUrl: './page-statistique.component.html',
  styleUrls: ['./page-statistique.component.scss']
})
export class PageStatistiqueComponent implements OnInit {
  mostSoldArticles: Array<any> = [];
  mostPurchaseArticles: Array<any> = [];
  topSpendingClients: Array<any> = [];

  constructor(
    private articleService: ArticleService,
    private clientService: ClientFournisseurService
  ) { }

  ngOnInit(): void {
    this.loadMostSoldArticles();
    this.loadMostPurshaseArticles();
    this.loadTopSpendingClients();
  }

  loadMostSoldArticles(): void {
    this.articleService.getMostSoldArticles().subscribe(articles => {
      this.mostSoldArticles = articles;
    });
  }

  loadMostPurshaseArticles(): void {
    this.articleService.getMostPurchasedArticles().subscribe(articles => {
      this.mostPurchaseArticles = articles;
    });
  }

  loadTopSpendingClients(): void {
    this.clientService.getTopSpendingClients().subscribe(clients => {
      this.topSpendingClients = clients;
    });
  }
}
