import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-page-accueil',
  templateUrl: './page-accueil.component.html',
  styleUrls: ['./page-accueil.component.scss']
})
export class PageAccueilComponent implements OnInit, OnDestroy {

  showDefaultContentVar = true;

  constructor(private router: Router, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(event => {
        const currentRoute = this.router.routerState.snapshot.url;
        
        if (currentRoute !== '/accueil') {
          this.hideDefaultContent();
        } else {
          this.showDefaultContent();
        }
        
        this.cdr.detectChanges();
      });
  }

  ngOnDestroy() {
    this.router.events.subscribe();
  }

  hideDefaultContent() {
    this.showDefaultContentVar = false;
  }

  showDefaultContent() {
    this.showDefaultContentVar = true;
  }

  navigate(code: string): void{
    if(code === '1'){
      this.router.navigate(['login']);
    }else if(code === '2'){
      this.router.navigate(['login2']);
    }else{
      console.log('error!! no route exist!');
    }
    
  }
}
