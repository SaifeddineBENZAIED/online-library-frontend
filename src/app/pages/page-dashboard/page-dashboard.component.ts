import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-page-dashboard',
  templateUrl: './page-dashboard.component.html',
  styleUrls: ['./page-dashboard.component.scss']
})
export class PageDashboardComponent implements OnInit {

  showContent: boolean = false;
  isAchatPage = false;

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {

    this.showContent = this.route.children.length === 0;

    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.showContent = this.route.children.length === 0;

        this.isAchatPage = this.route.snapshot.url[0]?.path === 'achat';
      });
  }
}
