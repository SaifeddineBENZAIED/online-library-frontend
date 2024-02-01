import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageLoginComponent } from './pages/page-login/page-login.component';
import { PageInscriptionComponent } from './pages/page-inscription/page-inscription.component';
import { PageAccueilComponent } from './pages/page-accueil/page-accueil.component';
import { PageLoginClientComponent } from './pages/page-login-client/page-login-client.component';
import { PageInscriptionClientComponent } from './pages/page-inscription-client/page-inscription-client.component';
import { PageDashboardComponent } from './pages/page-dashboard/page-dashboard.component';
import { PageArticleComponent } from './pages/articles/page-article/page-article.component';
import { NouvelArticleComponent } from './pages/articles/nouvel-article/nouvel-article.component';
import { PageStockComponent } from './pages/stock/page-stock/page-stock.component';
import { PageClientComponent } from './pages/client/page-client/page-client.component';
import { NouveauClientFournisseurComponent } from './composants/nouveau-client-fournisseur/nouveau-client-fournisseur.component';
import { PageCommandeClientFournisseurComponent } from './pages/page-commande-client-fournisseur/page-commande-client-fournisseur.component';
import { NouvelleCommandeClientFournisseurComponent } from './composants/nouvelle-commande-client-fournisseur/nouvelle-commande-client-fournisseur.component';
import { PageFournisseurComponent } from './pages/fournisseur/page-fournisseur/page-fournisseur.component';
import { PageUserComponent } from './pages/user/page-user/page-user.component';
import { NewUserComponent } from './pages/user/new-user/new-user.component';
import { PageProfilComponent } from './pages/profil/page-profil/page-profil.component';
import { ChangePasswordComponent } from './pages/profil/change-password/change-password.component';
import { PageProfilClientComponent } from './pages/profil-client/page-profil-client/page-profil-client.component';
import { ChangePasswordClientComponent } from './pages/profil-client/change-password-client/change-password-client.component';
import { PageAchatComponent } from './pages/page-achat/page-achat.component';
import { authGuard } from './auth.guard';
import { PageStatistiqueComponent } from './pages/page-statistique/page-statistique.component';
import { PageCmdForClientComponent } from './pages/page-cmd-for-client/page-cmd-for-client.component';
import { ModifierCmdClientComponent } from './composants/modifier-cmd-client/modifier-cmd-client.component';
import { PageLogoutComponent } from './pages/page-logout/page-logout.component';
import { PageLogoutClientComponent } from './pages/page-logout-client/page-logout-client.component';
import { userRoleGuard } from './user-role-guard';
import { clientRoleGuard } from './client-role-guard';

const routes: Routes = [
  {
    path: 'login',
    component: PageLoginComponent
  },
  {
    path: 'inscrire',
    component: PageInscriptionComponent
  },
  {
    path: 'accueil',
    component: PageAccueilComponent
  },
  /*{
    path: 'vente',
    component: PageVenteComponent,
  },*/
  {
    path: 'login2',
    component: PageLoginClientComponent,
  },
  {
    path: 'inscrire2',
    component: PageInscriptionClientComponent,
  },
  {
    path: '',
    component: PageDashboardComponent,
    canActivate: [authGuard],
    children: [
      {
        path: 'statistiques',
        component: PageStatistiqueComponent,
        canActivate: [authGuard, userRoleGuard]
      },
      {
        path: 'articles',
        component: PageArticleComponent,
        canActivate: [authGuard, userRoleGuard]
      },
      {
        path: 'nouvelarticle',
        component: NouvelArticleComponent,
        canActivate: [authGuard, userRoleGuard]
      },
      {
        path: 'nouvelarticle/:idArticle',
        component: NouvelArticleComponent,
        canActivate: [authGuard, userRoleGuard]
      },
      {
        path: 'mvmntstck',
        component: PageStockComponent,
        canActivate: [authGuard, userRoleGuard],
        data: {
          origin: 'mvmntstck'
        }
      },
      {
        path: 'clients',
        component: PageClientComponent,
        canActivate: [authGuard, userRoleGuard]
      },
      {
        path: 'nouveauclient',
        component: NouveauClientFournisseurComponent,
        canActivate: [authGuard, userRoleGuard],
        data: {
          origin: 'client'
        }
      },
      {
        path: 'nouveauclient/:id',
        component: NouveauClientFournisseurComponent,
        canActivate: [authGuard],
        data: {
          origin: 'client'
        }
      },
      {
        path: 'commandeclient',
        component: PageCommandeClientFournisseurComponent,
        canActivate: [authGuard, userRoleGuard],
        data: {
          origin: 'client'
        }
      },
      {
        path: 'nouvellecommandeclient',
        component: NouvelleCommandeClientFournisseurComponent,
        canActivate: [authGuard, userRoleGuard],
        data: {
          origin: 'client'
        }
      },
      {
        path: 'nouvellecommandeclient/:idCommande/:id',
        component: NouvelleCommandeClientFournisseurComponent,
        canActivate: [authGuard],
        data: {
          origin: 'client'
        }
      },
      {
        path: 'fournisseurs',
        component: PageFournisseurComponent,
        canActivate: [authGuard, userRoleGuard]
      },
      {
        path: 'nouveaufournisseur',
        component: NouveauClientFournisseurComponent,
        canActivate: [authGuard, userRoleGuard],
        data: {
          origin: 'fournisseur'
        }
      },
      {
        path: 'nouveaufournisseur/:id',
        component: NouveauClientFournisseurComponent,
        canActivate: [authGuard, userRoleGuard],
        data: {
          origin: 'fournisseur'
        }
      },
      {
        path: 'commandefournisseur',
        component: PageCommandeClientFournisseurComponent,
        canActivate: [authGuard, userRoleGuard],
        data: {
          origin: 'fournisseur'
        }
      },
      {
        path: 'nouvellecommandefournisseur',
        component: NouvelleCommandeClientFournisseurComponent,
        canActivate: [authGuard, userRoleGuard],
        data: {
          origin: 'fournisseur'
        }
      },
      {
        path: 'nouvellecommandefournisseur/:idCommande/:id',
        component: NouvelleCommandeClientFournisseurComponent,
        canActivate: [authGuard, userRoleGuard],
        data: {
          origin: 'fournisseur'
        }
      },
      {
        path: 'utilisateurs',
        component: PageUserComponent,
        canActivate: [authGuard, userRoleGuard]
      },
      {
        path: 'nouveauutilisateur',
        component: NewUserComponent,
        canActivate: [authGuard, userRoleGuard]
      },
      {
        path: 'nouveauutilisateur/:idUtilisateur',
        component: NewUserComponent,
        canActivate: [authGuard, userRoleGuard]
      },
      {
        path: 'profil',
        component: PageProfilComponent,
        canActivate: [authGuard, userRoleGuard]
      },
      {
        path: 'changermotdepasse',
        component: ChangePasswordComponent,
        canActivate: [authGuard, userRoleGuard]
      },
      {
        path: 'profilclient',
        component: PageProfilClientComponent,
        canActivate: [authGuard, clientRoleGuard]
      },
      {
        path: 'changerMDPclient',
        component: ChangePasswordClientComponent,
        canActivate: [authGuard, clientRoleGuard]
      },
      {
        path: 'achat/:id',
        component: PageAchatComponent,
        canActivate: [authGuard, clientRoleGuard],
        data: {
          origin: 'achat'
        }
      },
      {
        path: 'commandeclientforclient',
        component: PageCmdForClientComponent,
        canActivate: [authGuard, clientRoleGuard]
      },
      {
        path: 'modifiercommandeclient/:idCommande/:idClient',
        component: ModifierCmdClientComponent,
        canActivate: [authGuard, clientRoleGuard],
      },
      {
        path: 'logout',
        component: PageLogoutComponent,
        canActivate: [authGuard, userRoleGuard]
      },
      {
        path: 'logoutclient',
        component: PageLogoutClientComponent,
        canActivate: [authGuard, clientRoleGuard]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
