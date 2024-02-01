import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-page-logout',
  templateUrl: './page-logout.component.html',
  styleUrls: ['./page-logout.component.scss']
})
export class PageLogoutComponent implements OnInit{

  constructor(private router: Router) {}

  ngOnInit(): void {
    localStorage.removeItem('isuser');
    localStorage.removeItem('person');
    localStorage.removeItem('connectedPerson');
    this.router.navigate(['accueil']);
  }

}
