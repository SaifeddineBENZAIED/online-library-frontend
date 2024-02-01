import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageCommandeClientFournisseurComponent } from './page-commande-client-fournisseur.component';

describe('PageCommandeClientFournisseurComponent', () => {
  let component: PageCommandeClientFournisseurComponent;
  let fixture: ComponentFixture<PageCommandeClientFournisseurComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PageCommandeClientFournisseurComponent]
    });
    fixture = TestBed.createComponent(PageCommandeClientFournisseurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
