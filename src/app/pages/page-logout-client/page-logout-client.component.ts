import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-page-logout-client',
  templateUrl: './page-logout-client.component.html',
  styleUrls: ['./page-logout-client.component.scss']
})
export class PageLogoutClientComponent implements OnInit{

  constructor(private router: Router) {}

  ngOnInit(): void {
    localStorage.removeItem('isclient');
    localStorage.removeItem('person');
    localStorage.removeItem('connectedPerson');
    this.router.navigate(['accueil']);
  }
}
