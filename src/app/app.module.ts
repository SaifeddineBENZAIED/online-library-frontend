import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NouvelArticleComponent } from './pages/articles/nouvel-article/nouvel-article.component';
import { PageArticleComponent } from './pages/articles/page-article/page-article.component';
import { PageClientComponent } from './pages/client/page-client/page-client.component';
import { DashContentComponent } from './pages/dash-content/dash-content/dash-content.component';
import { PageFournisseurComponent } from './pages/fournisseur/page-fournisseur/page-fournisseur.component';
import { PageStockComponent } from './pages/stock/page-stock/page-stock.component';
import { PageAccueilComponent } from './pages/page-accueil/page-accueil.component';
import { PageAchatComponent } from './pages/page-achat/page-achat.component';
import { PageCommandeClientFournisseurComponent } from './pages/page-commande-client-fournisseur/page-commande-client-fournisseur.component';
import { PageDashboardComponent } from './pages/page-dashboard/page-dashboard.component';
import { PageInscriptionComponent } from './pages/page-inscription/page-inscription.component';
import { PageInscriptionClientComponent } from './pages/page-inscription-client/page-inscription-client.component';
import { PageLoginComponent } from './pages/page-login/page-login.component';
import { PageLoginClientComponent } from './pages/page-login-client/page-login-client.component';
import { ChangePasswordComponent } from './pages/profil/change-password/change-password.component';
import { ChangePasswordClientComponent } from './pages/profil-client/change-password-client/change-password-client.component';
import { NewUserComponent } from './pages/user/new-user/new-user.component';
import { BoutonActionComponent } from './composants/bouton-action/bouton-action.component';
import { DetailArticleComponent } from './composants/detail-article/detail-article.component';
import { DetailClientComponent } from './composants/detail-client/detail-client.component';
import { DetailCommandeComponent } from './composants/detail-commande/detail-commande.component';
import { DetailCommandeClientFournisseurComponent } from './composants/detail-commande-client-fournisseur/detail-commande-client-fournisseur.component';
import { DetailFournisseurComponent } from './composants/detail-fournisseur/detail-fournisseur.component';
import { DetailStockComponent } from './composants/detail-stock/detail-stock.component';
import { DetailStockArticleComponent } from './composants/detail-stock-article/detail-stock-article.component';
import { DetailUserComponent } from './composants/detail-user/detail-user.component';
import { FooterComponent } from './composants/footer/footer.component';
import { HeaderComponent } from './composants/header/header.component';
import { LoaderComponent } from './composants/loader/loader.component';
import { MenuComponent } from './composants/menu/menu.component';
import { NouveauClientFournisseurComponent } from './composants/nouveau-client-fournisseur/nouveau-client-fournisseur.component';
import { NouvelleCommandeClientFournisseurComponent } from './composants/nouvelle-commande-client-fournisseur/nouvelle-commande-client-fournisseur.component';
import { PaginationComponent } from './composants/pagination/pagination.component';
import { FormsModule } from '@angular/forms';
import { CommonModule, DatePipe } from '@angular/common';
import { HttpInterceptorService } from './services/interceptor/http-interceptor.service';
import { PageUserComponent } from './pages/user/page-user/page-user.component';
import { PageProfilComponent } from './pages/profil/page-profil/page-profil.component';
import { PageStatistiqueComponent } from './pages/page-statistique/page-statistique.component';
import { PageCmdForClientComponent } from './pages/page-cmd-for-client/page-cmd-for-client.component';
import { PageProfilClientComponent } from './pages/profil-client/page-profil-client/page-profil-client.component';
import { ModifierCmdClientComponent } from './composants/modifier-cmd-client/modifier-cmd-client.component';
import { PageLogoutComponent } from './pages/page-logout/page-logout.component';
import { PageLogoutClientComponent } from './pages/page-logout-client/page-logout-client.component';
import { TextColorDirective } from './directive/text-color.directive';

@NgModule({
  declarations: [
    AppComponent,
    NouvelArticleComponent,
    PageArticleComponent,
    PageClientComponent,
    DashContentComponent,
    PageFournisseurComponent,
    PageStockComponent,
    PageAccueilComponent,
    PageAchatComponent,
    PageCommandeClientFournisseurComponent,
    PageDashboardComponent,
    PageInscriptionComponent,
    PageInscriptionClientComponent,
    PageLoginComponent,
    PageLoginClientComponent,
    ChangePasswordComponent,
    ChangePasswordClientComponent,
    NewUserComponent,
    BoutonActionComponent,
    DetailArticleComponent,
    DetailClientComponent,
    DetailCommandeComponent,
    DetailCommandeClientFournisseurComponent,
    DetailFournisseurComponent,
    DetailStockComponent,
    DetailStockArticleComponent,
    DetailUserComponent,
    FooterComponent,
    HeaderComponent,
    LoaderComponent,
    MenuComponent,
    NouveauClientFournisseurComponent,
    NouvelleCommandeClientFournisseurComponent,
    PaginationComponent,
    NewUserComponent,
    PageUserComponent,
    PageProfilComponent,
    PageStatistiqueComponent,
    PageCmdForClientComponent,
    PageProfilClientComponent,
    ModifierCmdClientComponent,
    PageLogoutComponent,
    PageLogoutClientComponent,
    TextColorDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    CommonModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptorService,
      multi: true
    },
    HttpClient,
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
