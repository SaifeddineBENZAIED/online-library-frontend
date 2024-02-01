import { Component, OnInit } from '@angular/core';
import { Menu } from './menu';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { ClientDto } from 'src/app/dto/client-dto';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit{

  origin = '';

  public menuProperties : Array<Menu> = [
    {
      id: '1',
      titre: 'Tableau de bord',
      icon: 'fa-solid fa-chart-simple',
      url: '',
      sousMenu: [
        {
          id: '11',
          titre: 'Vue d\'ensemble',
          icon: 'fa-solid fa-magnifying-glass-chart',
          url: ''
        },
        {
          id: '12',
          titre: 'Statistiques',
          icon: 'fa-solid fa-chart-pie',
          url: 'statistiques'
        }
      ]
    },
    {
      id: '2',
      titre: 'Articles',
      icon: 'fa-solid fa-cubes',
      url: '',
      sousMenu: [
        {
          id: '21',
          titre: 'Articles',
          icon: 'fa-solid fa-boxes-stacked',
          url: 'articles'
        },
        {
          id: '22',
          titre: 'Mouvement de stock',
          icon: 'fa-solid fa-arrow-right-arrow-left',
          url: 'mvmntstck'
        }
      ]
    },
    {
      id: '3',
      titre: 'Clients',
      icon: 'fa-solid fa-people-group',
      url: '',
      sousMenu: [
        {
          id: '31',
          titre: 'Clients',
          icon: 'fa-solid fa-people-line',
          url: 'clients'
        },
        {
          id: '32',
          titre: 'Commandes clients',
          icon: 'fa-solid fa-cart-shopping',
          url: 'commandeclient'
        }
      ]
    },
    {
      id: '4',
      titre: 'Fournisseurs',
      icon: 'fa-solid fa-truck-field',
      url: '',
      sousMenu: [
        {
          id: '41',
          titre: 'Fournisseurs',
          icon: 'fa-solid fa-people-carry-box',
          url: 'fournisseurs'
        },
        {
          id: '42',
          titre: 'Commandes fournisseurs',
          icon: 'fa-solid fa-cart-shopping',
          url: 'commandefournisseur'
        }
      ]
    },
    {
      id: '5',
      titre: 'Parametrages',
      icon: 'fa-solid fa-gear',
      url: '',
      sousMenu: [
        /*{
          id: '51',
          titre: 'Categories',
          icon: 'fa-solid fa-layer-group',
          url: 'categories'
        },*/
        {
          id: '52',
          titre: 'Utilisateurs',
          icon: 'fa-solid fa-users',
          url: 'utilisateurs'
        },
        {
          id: '53',
          titre: 'Déconnecter',
          icon: 'fa-solid fa-user-slash',
          url: 'logout'
        }
      ]
    }
  ];

  public menuPropertiesForClient : Array<Menu> = [
    {
      id: '1',
      titre: 'Tableau de bord',
      icon: 'fa-solid fa-chart-simple',
      url: '',
      sousMenu: [
        {
          id: '11',
          titre: 'Vue d\'ensemble',
          icon: 'fa-solid fa-magnifying-glass-chart',
          url: ''
        },
        {
          id: '11',
          titre: 'Acheter',
          icon: 'fa-solid fa-cart-shopping',
          url: 'achat'
        }
      ]
    },
    {
      id: '3',
      titre: 'Compte',
      icon: 'fa-solid fa-user',
      url: '',
      sousMenu: [
        {
          id: '31',
          titre: 'Profil',
          icon: 'fa-solid fa-user',
          url: 'profilclient'
        },
        {
          id: '32',
          titre: 'Historique d achat',
          icon: 'fa-solid fa-cart-shopping',
          url: 'commandeclientforclient'
        },
        {
          id: '33',
          titre: 'Déconnecter',
          icon: 'fa-solid fa-user-slash',
          url: 'logoutclient'
        }
      ]
    }
  ];
  
  private lastSelectedMenu: Menu | undefined;

  selected = false;

  isClient = false;

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private authService: AuthenticationService){}

  ngOnInit(): void{
    this.isClient = false;
    this.activatedRoute.data.subscribe(data => {
      this.origin = data['origin'];
    });
    if(localStorage.getItem('isclient') && localStorage.getItem('isclient') === 'true'){
      this.isClient = true;
    }
  }

  navigate(menu: Menu): void{
    if(this.lastSelectedMenu){
      this.lastSelectedMenu.active=false;
    }
    menu.active=true;
    this.lastSelectedMenu=menu;
    this.router.navigate([menu.url]);
  }

  navigateForClient(menu: Menu): void{
    if(this.lastSelectedMenu){
      this.lastSelectedMenu.active=false;
    }
    menu.active=true;
    this.lastSelectedMenu=menu;
    if(menu.url === 'achat'){
      const client = this.authService.getPerson() as ClientDto;
      this.router.navigate(['achat', client.id]);
    }else{
      this.router.navigate([menu.url]);
    }
    
  }
}
